import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 1. Validation de baz pou done ki rantre yo (Sanitization & Check)
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tanpri ranpli tout chan ki obligatwa yo.' },
        { status: 400 }
      );
    }

    // Email format regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adrès imèl sa a pa valid.' },
        { status: 400 }
      );
    }

    // 2. Transporter Nodemailer ak Zoho SMTP (Port 465 SSL)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 3. Imèl Alèt ki pral jwenn ou menm (Fednel)
    const adminMailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject || 'Nouveau Message'} - de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">Nouvo Mesaj sou Portfolio a</h2>
          <p><strong>Non:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sijè:</strong> ${subject || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
          <p><strong>Mesaj:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f9fafb; padding: 12px; border-radius: 6px;">${message}</p>
        </div>
      `,
    };

    // 4. Akizè de Resepsyon Otomatik pou vizitè a
    const autoReplyOptions = {
      from: `"Fednel Charite" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Mèsi paske ou kontakte Fednel Charite | Acknowledgment',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-bottom: 16px;">Bonjou ${name},</h2>
          <p>Mwen byen resevwa mesaj ou an. Mèsi paske ou pran tan kontakte m atravè portfolio pwofesyonèl mwen an (<strong>fednelcharite.site</strong>).</p>
          <p>M ap analize demann ou an epi m ap reponn ou nan mwens pase 24 a 48 èdtan.</p>
          <br />
          <div style="border-top: 2px solid #2563eb; padding-top: 12px; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold; color: #0f172a;">Fednel Charite</p>
            <p style="margin: 0; color: #4b5563; font-size: 0.9em;">Software Engineer & Cybersecurity Consultant</p>
            <p style="margin: 4px 0 0 0;"><a href="https://fednelcharite.site" style="color: #2563eb; text-decoration: none;">fednelcharite.site</a></p>
          </div>
        </div>
      `,
    };

    // Voye de imèl yo an senkronize
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(autoReplyOptions),
    ]);

    return NextResponse.json(
      { success: true, message: 'Mesaj ou an voye ak siksè!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur API /api/contact:', error);
    return NextResponse.json(
      { error: 'Yon erè rive pandan enskripsyon an. Tanpri reesaye pita.' },
      { status: 500 }
    );
  }
}