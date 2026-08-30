import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, lang } = body;

    const currentLang = lang === 'en' ? 'en' : 'fr';

    const errorValidation = {
      fr: 'Veuillez remplir tous les champs obligatoires.',
      en: 'Please fill in all required fields.',
    }[currentLang];

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: errorValidation },
        { status: 400 }
      );
    }

   const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true pou port 465 sou Vercel
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  connectionTimeout: 10000, // 10 segonn max pou timeout
});

    const senderEmail = process.env.SMTP_USER || 'contact@fednelcharite.site';

    // 1. Email alèt pou ou menm
    const adminMailOptions = {
      from: `"Portfolio Contact" <${senderEmail}>`,
      to: senderEmail,
      replyTo: email,
      subject: `[Portfolio Contact] Nouveau message de ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #111; max-width: 600px; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #2563eb; margin-top: 0;">Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Langue :</strong> ${currentLang.toUpperCase()}</p>
          <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 16px 0;" />
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0;">${message}</p>
        </div>
      `,
    };

    // 2. Modèl imèl akizè de resepsyon imèn, pwofesyonèl ak bèl header
    const autoReplyTemplates = {
      fr: {
        subject: 'Merci pour votre message | Fednel Charité',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; background-color: #0f172a;">
            
            <!-- Header avec Design sombre / Gradient -->
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 32px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0; font-family: monospace; font-size: 12px; color: #38bdf8; text-transform: uppercase; letter-spacing: 2px;">Fednel Charité · Software Engineer</p>
              <h1 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff;">Bien reçu ! Merci de m'avoir écrit.</h1>
            </div>

            <!-- Content -->
            <div style="padding: 28px 24px; background-color: #ffffff; color: #334155;">
              <p style="margin-top: 0; font-size: 16px; font-weight: 600; color: #0f172a;">Bonjour ${name},</p>
              <p>J'ai bien pris connaissance de votre message transmis via mon portfolio (<strong>fednelcharite.site</strong>).</p>
              <p>Chaque opportunité et projet compte pour moi. Je vous reviendrai personnellement en <strong>moins de 24 heures</strong>.</p>
              
              <div style="margin-top: 28px; padding-top: 20px; border-top: 2px solid #2563eb;">
                <p style="margin: 0; font-weight: 700; color: #0f172a; font-size: 15px;">Fednel Charité</p>
                <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Software Engineer & DevSecOps Consultant</p>
                <p style="margin: 8px 0 0 0;"><a href="https://fednelcharite.site" style="color: #2563eb; text-decoration: none; font-size: 13px; font-weight: 600;">fednelcharite.site</a></p>
              </div>
            </div>

          </div>
        `,
      },
      en: {
        subject: 'Thank you for your message | Fednel Charité',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; background-color: #0f172a;">
            
            <!-- Header with Dark / Gradient Design -->
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 32px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0; font-family: monospace; font-size: 12px; color: #38bdf8; text-transform: uppercase; letter-spacing: 2px;">Fednel Charité · Software Engineer</p>
              <h1 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff;">Message Received! Thanks for reaching out.</h1>
            </div>

            <!-- Content -->
            <div style="padding: 28px 24px; background-color: #ffffff; color: #334155;">
              <p style="margin-top: 0; font-size: 16px; font-weight: 600; color: #0f172a;">Hello ${name},</p>
              <p>I have successfully received your message sent through my portfolio (<strong>fednelcharite.site</strong>).</p>
              <p>Every project and opportunity is important to me. I will personally respond in <strong>less than 24 hours</strong>.</p>
              
              <div style="margin-top: 28px; padding-top: 20px; border-top: 2px solid #2563eb;">
                <p style="margin: 0; font-weight: 700; color: #0f172a; font-size: 15px;">Fednel Charité</p>
                <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Software Engineer & DevSecOps Consultant</p>
                <p style="margin: 8px 0 0 0;"><a href="https://fednelcharite.site" style="color: #2563eb; text-decoration: none; font-size: 13px; font-weight: 600;">fednelcharite.site</a></p>
              </div>
            </div>

          </div>
        `,
      },
    };

    const autoReplyOptions = {
      from: `"Fednel Charité" <${senderEmail}>`,
      to: email,
      subject: autoReplyTemplates[currentLang].subject,
      html: autoReplyTemplates[currentLang].html,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur API /api/contact:', error?.message || error);
    return NextResponse.json(
      { error: 'An error occurred while sending the message.' },
      { status: 500 }
    );
  }
}