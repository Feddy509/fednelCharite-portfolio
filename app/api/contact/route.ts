import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { logSecurityEvent } from '@/lib/logger';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'UNKNOWN';
  const path = '/api/contact';

  try {
    const body = await req.json();
    const { name, email, message, lang, token } = body;

    const currentLang = lang === 'en' ? 'en' : 'fr';

    const errorValidation = {
      fr: 'Veuillez remplir tous les champs obligatoires.',
      en: 'Please fill in all required fields.',
    }[currentLang];

    const errorTurnstile = {
      fr: 'Échec de la vérification de sécurité anti-bot.',
      en: 'Anti-bot security verification failed.',
    }[currentLang];

    // 1. Validation des champs obligatoires et du token Turnstile
    if (!name || !email || !message) {
      logSecurityEvent('WARN', {
        event: 'CONTACT_FORM_INVALID_INPUT',
        ip,
        userAgent,
        path,
        details: { reason: 'Missing required fields', hasName: !!name, hasEmail: !!email, hasMessage: !!message },
      });

      return NextResponse.json(
        { error: errorValidation },
        { status: 400 }
      );
    }

    if (!token) {
      logSecurityEvent('SECURITY', {
        event: 'CONTACT_FORM_MISSING_TURNSTILE_TOKEN',
        ip,
        userAgent,
        path,
        details: { reason: 'No bot-verification token provided' },
      });

      return NextResponse.json(
        { error: errorTurnstile },
        { status: 400 }
      );
    }

    // 2. Vérification du token auprès des serveurs Cloudflare Turnstile
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const turnstileRes = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: token,
        }),
      });

      const turnstileData = await turnstileRes.json();

      if (!turnstileData.success) {
        logSecurityEvent('SECURITY', {
          event: 'CONTACT_FORM_TURNSTILE_FAILED',
          ip,
          userAgent,
          path,
          details: { errorCodes: turnstileData['error-codes'] || [] },
        });

        return NextResponse.json(
          { error: errorTurnstile },
          { status: 400 }
        );
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 10000,
    });

    const senderEmail = process.env.SMTP_USER || 'contact@fednelcharite.site';
    const profileImageUrl = 'https://fednelcharite.site/images/avatar.png'; 

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

    // 2. Modèl imèl akizè de resepsyon imèn ak FOTO PROFIL
    const autoReplyTemplates = {
      fr: {
        subject: 'Merci pour votre message | Fednel Charité',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; background-color: #0f172a;">
            
            <!-- Header avec Design sombre, Gradient et Foto Profil -->
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 32px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <td style="vertical-align: middle;">
                    <p style="margin: 0; font-family: monospace; font-size: 12px; color: #38bdf8; text-transform: uppercase; letter-spacing: 2px;">Fednel Charité · Software Engineer</p>
                    <h1 style="margin: 8px 0 0 0; font-size: 20px; font-weight: 800; color: #ffffff;">Bien reçu ! Merci de m'avoir écrit.</h1>
                  </td>
                  <td style="width: 64px; text-align: right; vertical-align: middle;">
                    <img src="${profileImageUrl}" alt="Fednel Charité" style="width: 56px; height: 56px; border-radius: 50%; border: 2px solid #38bdf8; object-fit: cover; display: block;" />
                  </td>
                </tr>
              </table>
            </div>

            <!-- Content -->
            <div style="padding: 28px 24px; background-color: #ffffff; color: #334155;">
              <p style="margin-top: 0; font-size: 16px; font-weight: 600; color: #0f172a;">Bonjour ${name},</p>
              <p>J'ai bien pris connaissance de votre message transmis via mon portfolio (<strong>fednelcharite.site</strong>).</p>
              <p>Chaque opportunité et projet compte pour moi. Je vous reviendrai personnellement en <strong>moins de 24 heures</strong>.</p>
              
              <!-- Signature avec Foto Profil -->
              <div style="margin-top: 28px; padding-top: 20px; border-top: 2px solid #2563eb;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right: 12px; vertical-align: middle;">
                      <img src="${profileImageUrl}" alt="Fednel Charité" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; display: block;" />
                    </td>
                    <td style="vertical-align: middle;">
                      <p style="margin: 0; font-weight: 700; color: #0f172a; font-size: 15px;">Fednel Charité</p>
                      <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Software Engineer & DevSecOps Specialist</p>
                      <p style="margin: 4px 0 0 0;"><a href="https://fednelcharite.site" style="color: #2563eb; text-decoration: none; font-size: 13px; font-weight: 600;">fednelcharite.site</a></p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

          </div>
        `,
      },
      en: {
        subject: 'Thank you for your message | Fednel Charité',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; background-color: #0f172a;">
            
            <!-- Header with Dark / Gradient Design and Profile Picture -->
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 32px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <td style="vertical-align: middle;">
                    <p style="margin: 0; font-family: monospace; font-size: 12px; color: #38bdf8; text-transform: uppercase; letter-spacing: 2px;">Fednel Charité · Software Engineer</p>
                    <h1 style="margin: 8px 0 0 0; font-size: 20px; font-weight: 800; color: #ffffff;">Message Received! Thanks for reaching out.</h1>
                  </td>
                  <td style="width: 64px; text-align: right; vertical-align: middle;">
                    <img src="${profileImageUrl}" alt="Fednel Charité" style="width: 56px; height: 56px; border-radius: 50%; border: 2px solid #38bdf8; object-fit: cover; display: block;" />
                  </td>
                </tr>
              </table>
            </div>

            <!-- Content -->
            <div style="padding: 28px 24px; background-color: #ffffff; color: #334155;">
              <p style="margin-top: 0; font-size: 16px; font-weight: 600; color: #0f172a;">Hello ${name},</p>
              <p>I have successfully received your message sent through my portfolio (<strong>fednelcharite.site</strong>).</p>
              <p>Every project and opportunity is important to me. I will personally respond in <strong>less than 24 hours</strong>.</p>
              
              <!-- Signature with Profile Picture -->
              <div style="margin-top: 28px; padding-top: 20px; border-top: 2px solid #2563eb;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right: 12px; vertical-align: middle;">
                      <img src="${profileImageUrl}" alt="Fednel Charité" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; display: block;" />
                    </td>
                    <td style="vertical-align: middle;">
                      <p style="margin: 0; font-weight: 700; color: #0f172a; font-size: 15px;">Fednel Charité</p>
                      <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Software Engineer & DevSecOps Consultant</p>
                      <p style="margin: 4px 0 0 0;"><a href="https://fednelcharite.site" style="color: #2563eb; text-decoration: none; font-size: 13px; font-weight: 600;">fednelcharite.site</a></p>
                    </td>
                  </tr>
                </table>
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

    logSecurityEvent('INFO', {
      event: 'CONTACT_FORM_SUBMITTED_SUCCESS',
      ip,
      userAgent,
      path,
      details: { email, name, lang: currentLang },
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error: any) {
    logSecurityEvent('ERROR', {
      event: 'CONTACT_API_FAILURE',
      ip,
      userAgent,
      path,
      details: { error: error?.message || String(error) },
    });

    return NextResponse.json(
      { error: 'An error occurred while sending the message.' },
      { status: 500 }
    );
  }
}