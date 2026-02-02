import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { phoneNumber, amount, reference } = await request.json();

        // 1. Validate Input
        if (!phoneNumber || !amount) {
            return NextResponse.json({ error: 'Phone number and amount are required' }, { status: 400 });
        }

        // 2. Get Credentials from Env
        const consumerKey = process.env.MPESA_CONSUMER_KEY;
        const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
        const shortcode = process.env.MPESA_SHORTCODE;
        const passkey = process.env.MPESA_PASSKEY;

        // Mock mode if keys are missing (for safe testing/deployment without crashing)
        if (!consumerKey || !consumerSecret) {
            console.warn('Missing M-Pesa Environment Variables. Running in MOCK mode.');
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            return NextResponse.json({
                success: true,
                message: 'MOCK: Payment request sent. Check phone for PIN.',
                transactionId: 'MOCK_' + Date.now()
            });
        }

        // 3. Generate Access Token
        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
        const tokenResponse = await fetch('https://api.sandbox.vm.co.mz/ipg/v1x/token', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Origin': 'developer.mpesa.vm.co.mz'
            }
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to generate M-Pesa token');
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.output_SessionID || tokenData.access_token; // Adjust based on actual response format

        // 4. Generate Password & Timestamp
        // Format: YYYYMMDDHHmmss
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
        const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

        // 5. Send STK Push (C2B)
        // Ensure ThirdPartyReference is UNVERSALLY unique to avoid 409 Duplicate Transaction errors from M-Pesa
        const salt = Math.random().toString(36).substring(2, 6).toUpperCase();
        const uniqueReference = `REG_${salt}_${Date.now()}`;

        const paymentResponse = await fetch('https://api.sandbox.vm.co.mz/ipg/v1x/c2bPayment/singleStage/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Origin': 'developer.mpesa.vm.co.mz'
            },
            body: JSON.stringify({
                input_TransactionReference: reference || uniqueReference,
                input_CustomerMSISDN: phoneNumber, // Format: 25884xxxxxxx
                input_Amount: amount,
                input_ThirdPartyReference: uniqueReference, // M-Pesa uses this for duplicate detection
                input_ServiceProviderCode: shortcode,
            })
        });

        const paymentData = await paymentResponse.json();

        if (!paymentResponse.ok) {
            console.error('M-Pesa Payment Error:', paymentData);
            return NextResponse.json({ error: 'Payment request failed', details: paymentData }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: paymentData });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
