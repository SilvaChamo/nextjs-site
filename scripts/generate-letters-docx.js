const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require("docx");
const fs = require("fs");

// Create document
const doc = new Document({
    sections: [{
        properties: {},
        children: [
            // Title
            new Paragraph({
                text: "Documentação para Formalização e Integração - Base Agro Data",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }), // Spacer

            // 1. M-Pesa Letter
            new Paragraph({
                text: "1. Carta ao M-Pesa (Vodacom / M-Pesa S.A.)",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Assunto: ", bold: true }),
                    new TextRun("Solicitação de Acesso ao Ambiente de Produção da API M-Pesa (C2B)"),
                ],
            }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "À Direção Comercial da M-Pesa S.A.," }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "Pela presente, a [Nome da Sua Empresa], portadora do NUIT [Seu NUIT], vem por este meio solicitar a integração da API M-Pesa (C2B - Customer to Business) na nossa plataforma digital denominada Base Agro Data.",
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "A Base Agro Data é uma plataforma de agronegócio que visa facilitar a comercialização de produtos agrícolas e o acesso a informação de mercado em Moçambique. A integração do M-Pesa é fundamental para permitir que os nossos utilizadores efectuem o pagamento de assinaturas e a liquidação de transacções de forma segura e célere.",
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "Solicitamos o envio dos termos de serviço e a atribuição das credenciais de produção (Service Provider Code, Primary Key, API Port) para o arranque da integração técnica.",
            }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "Sem mais de momento, subscrevemo-nos com a mais elevada estima e consideração." }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "[Assinatura e Carimbo]", bold: true }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "--------------------------------------------------------------------------------", alignment: AlignmentType.CENTER }),
            new Paragraph({ text: "" }),

            // 2. e-Mola Letter
            new Paragraph({
                text: "2. Carta ao e-Mola (Movitel)",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Assunto: ", bold: true }),
                    new TextRun("Solicitação de Integração de Pagamentos e-Mola Business"),
                ],
            }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "À Direção de Serviços de Valor Acrescentado (VAS) da Movitel, S.A.," }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "[Nome da Sua Empresa], vem por este meio manifestar o interesse em integrar o sistema de pagamentos e-Mola na plataforma Base Agro Data.",
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "O nosso projecto foca-se no desenvolvimento do sector agrário moçambicano, e a rede da Movitel, dada a sua vasta penetração em zonas rurais, é um parceiro estratégico fundamental para os nossos agricultores e empresas.",
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "Solicitamos a documentação técnica (API Specification) e os requisitos contratuais para a activação de uma conta Business que permita a recepção de pagamentos directamente no nosso sistema.",
            }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "Melhores cumprimentos," }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "[Assinatura e Carimbo]", bold: true }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "--------------------------------------------------------------------------------", alignment: AlignmentType.CENTER }),
            new Paragraph({ text: "" }),

            // 3. MADER Letter
            new Paragraph({
                text: "3. Carta ao MADER (Parceria de Dados)",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Assunto: ", bold: true }),
                    new TextRun("Proposta de Parceria para Partilha de Dados e Digilitização Agrária"),
                ],
            }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "À Sua Excelência, Ministro da Agricultura e Desenvolvimento Rural," }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "A [Nome da Sua Empresa] tem a honra de apresentar a Base Agro Data, uma plataforma digital inovadora desenvolvida para centralizar cotações de mercado, contactos institucionais e oportunidades de financiamento para o agronegócio moçambicano.",
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "Reconhecendo o papel vital do SIMA (Sistema de Informação de Mercados Agrícolas), propomos o estabelecimento de uma parceria para a integração automatizada das cotações oficiais na nossa plataforma. O objectivo é ampliar o alcance dos dados do Ministério, fazendo-os chegar em tempo real ao telemóvel do pequeno e médio produtor via SMS e Web.",
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "Solicitamos uma audiência técnica com a equipa do SIMA para discutir a viabilidade de acesso aos dados via API ou Web Service, garantindo a integridade e oficialidade da informação transmitida aos nossos utilizadores.",
            }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "Atenciosamente," }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "[Assinatura e Carimbo]", bold: true }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "--------------------------------------------------------------------------------", alignment: AlignmentType.CENTER }),
            new Paragraph({ text: "" }),

            // 4. Requirements & SMS
            new Paragraph({
                text: "4. Requisitos Técnicos e Orçamento SMS",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({ text: "Documentação Necessária:", bold: true }),
            new Paragraph({ text: "• Alvará da empresa / Licença de Actividade" }),
            new Paragraph({ text: "• NUIT e Certidão de Registo Comercial" }),
            new Paragraph({ text: "• BI dos sócios" }),
            new Paragraph({ text: "• Conta Bancária Empresarial" }),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "Estimativa de Créditos SMS (1.5 MT a 2.5 MT/SMS):", bold: true }),
            new Paragraph({ text: "• 10.000 SMS: 25.000,00 MT" }),
            new Paragraph({ text: "• 50.000 SMS: 100.000,00 MT" }),
            new Paragraph({ text: "• 100.000 SMS: 150.000,00 MT" }),
        ],
    }],
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then((buffer) => {
    const filePath = "Documentacao_BaseAgroData.docx";
    fs.writeFileSync(filePath, buffer);
    console.log(`Documento Word gerado com sucesso: ${filePath}`);
});
