import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { to, subject, html, replyTo, attachments } = await req.json();

        // 1. Basic Validation
        if (!to || !Array.isArray(to) || to.length === 0) {
            return NextResponse.json({ error: 'Missing recipients' }, { status: 400 });
        }
        if (!subject || !html) {
            return NextResponse.json({ error: 'Missing subject or content' }, { status: 400 });
        }

        // 2. Configure Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 3. Verify Connection
        try {
            await transporter.verify();
        } catch (error) {
            console.error("SMTP Connection Error:", error);
            return NextResponse.json({ error: 'Failed to connect to SMTP server' }, { status: 500 });
        }

        // 4. Send Emails (Looping to send individually or use BCC based entirely on privacy preference)
        // For mass marketing, better to send individually or in small batches to avoid spam filters.
        // Or put everyone in BCC. Let's send one email with everyone in BCC for efficiency if < 50, else batch.
        // Actually, for personalized headers or to avoid "undisclosed-recipients" flag issues, individual sends or a provider API is best.
        // Since we are using standard SMTP, let's try sending individually for better deliverability on small scales,
        // or one generic email with BCC.

        // Let's go effectively with BCC for now to save SMTP connections/time if the list is huge.
        // But the user requested "Origin Email". If we send via SMTP, the 'from' is usually fixed to the auth user
        // unless the server allows spoofing (rare). We can set 'replyTo'.

        const mailOptions = {
            from: `"${process.env.SMTP_USER_FROM_NAME || 'Base Agro Data'}" <${process.env.SMTP_USER}>`,
            replyTo: replyTo || process.env.SMTP_USER,
            to: process.env.SMTP_USER, // Send to self
            bcc: to, // Hidden recipients
            subject: subject,
            html: html,
            attachments: attachments ? attachments.map((url: string) => ({
                path: url
            })) : []
        };

        const info = await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, messageId: info.messageId });

    } catch (error: any) {
        console.error("Email Sending Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
