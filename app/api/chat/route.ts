import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { logSecurityEvent } from "@/lib/logger";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 10;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRate = rateLimitMap.get(ip);

  if (!userRate) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (now - userRate.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (userRate.count >= LIMIT) {
    return true;
  }

  userRate.count += 1;
  return false;
}

// Netwaye epi izole nèt chèn valè yo
function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim();
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const userAgent = req.headers.get("user-agent") || "UNKNOWN";
  const path = "/api/chat";

  try {
    if (isRateLimited(ip)) {
      logSecurityEvent("SECURITY", {
        event: "CHAT_RATE_LIMIT_EXCEEDED",
        ip,
        userAgent,
        path,
        details: { limit: LIMIT, windowMs: WINDOW_MS },
      });

      return NextResponse.json(
        { error: "Too many requests. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    // 1. Dekonstriksyon ak Sanitization Strik anvan nenpòt itilizasyon
    const rawBody = await req.json();
    const rawMessages = Array.isArray(rawBody?.messages) ? rawBody.messages : [];
    const isEnglish = String(rawBody?.language || "").toLowerCase() === "en";

    if (rawMessages.length === 0) {
      logSecurityEvent("WARN", {
        event: "CHAT_API_INVALID_PAYLOAD",
        ip,
        userAgent,
        path,
        details: { reason: "Invalid or empty messages payload" },
      });

      return NextResponse.json(
        { error: "Invalid or empty messages payload." },
        { status: 400 }
      );
    }

    // 2. Izolasyon Konplè (Disconnecting Taint Flow for CodeQL)
    const sanitizedMessages: Array<{ role: "user" | "model"; text: string }> = [];

    for (const item of rawMessages) {
      if (!item || typeof item !== "object") continue;
      
      const roleStr = String((item as Record<string, unknown>).role || "");
      const contentStr = sanitizeText((item as Record<string, unknown>).content);

      if (!contentStr) continue;

      const safeRole = roleStr === "assistant" || roleStr === "model" ? "model" : "user";
      sanitizedMessages.push({
        role: safeRole,
        text: contentStr,
      });
    }

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "Invalid content format." },
        { status: 400 }
      );
    }

    // 3. Verifikasyon maksimòm 500 karaktè sou dènye mesaj la
    const lastItem = sanitizedMessages[sanitizedMessages.length - 1];

    if (lastItem.text.length > 500) {
      logSecurityEvent("SECURITY", {
        event: "CHAT_PROMPT_INJECTION_SUSPECTED",
        ip,
        userAgent,
        path,
        details: {
          reason: "Message exceeded maximum character limit",
          contentLength: lastItem.text.length,
        },
      });

      const errorMsg = isEnglish
        ? "Your message must not exceed 500 characters."
        : "Votre message ne doit pas dépasser 500 caractères.";

      return NextResponse.json(
        { error: errorMsg },
        { status: 400 }
      );
    }

    // Fixed System Prompts
    const systemPromptFr = `
Tu es Feddy, l'assistant virtuel intelligent et professionnel du portfolio de Fednel Charité. 
Ton rôle est d'accueillir les visiteurs et de répondre à leurs questions avec précision.

INFORMATIONS CLÉS SUR FEDNEL CHARITÉ :
- Rôle & Identité : Full-Stack Software Engineer & Aspiring DevSecOps. Il conçoit des architectures logicielles robustes, sécurisées et évolutives.
- Éducation : Étudiant finissant en sciences informatiques à l'Université Unitech (en attente de soutenance pour l'obtention de sa licence).
- Expérience Professionnelle : Consultant en support technique et technicien informatique indépendant depuis 2023 (3 ans d'expérience). Il a accompagné plus de 70 clients en résolution de problèmes de dépannage matériel (réparation d'écrans, claviers, barrettes RAM), installation et configuration d'antivirus (Bitdefender), déploiement de systèmes Windows et support technique global.
- Langues : Français (Niveau B2 certifié par l'examen TEF Canada) et Anglais.
- Compétences techniques : JavaScript, TypeScript, React, Next.js, Node.js, Express.js, Python, Tailwind CSS, Docker, PostgreSQL, MongoDB, DevSecOps (WAF, TLS, MFA).
- Certifications obtenues : IBM Full Stack Software Developer, IBM Front-End, IBM Full-Stack JavaScript, IBM Génie Logiciel & DevOps, IBM Backend Developer, IBM IT Support, IBM Analyste en Cybersécurité, Microsoft IT Support Specialist, Cisco Junior Cybersecurity Analyst.
- Certifications en préparation : CompTIA Security+, AWS Certified Developer - Associate, Microsoft Certified: Azure Developer Associate.

Projets phares et réalisations de Fednel :
1. Solutions Technologies Hub (https://solutionstechhub.com) : Agence de développement logiciel et startup fondée par Fednel. Elle propose des solutions web, mobiles et d'entreprise sur mesure. C'est également l'entité qui centralise le panneau de gestion des comptes des plateformes de l'écosystème.
2. Zye Klere (https://zyeklere.com) : Plateforme avancée de sensibilisation et d'éducation à la cybersécurité et à la confidentialité numérique. 
   - Fonctionnalités clés : Un tableau de bord utilisateur complet (gestion de profil, modification du mot de passe, activation de la double authentification MFA, vérification du statut de la licence utilisateur requise pour accéder aux fonctionnalités avancées). Une section d'articles interactifs (lecture, commentaires, partage). Une section de tutoriels vidéo sécurisés (les vidéos sont hébergées sur la plateforme avec protection intégrée empêchant les captures ou enregistrements d'écran, accessibles après paiement d'une licence via passerelles de paiement locales et internationales : Natcash, MonCash, Visa, Mastercard). Des outils de cybersécurité intégrés (testeur de force de mots de passe, calcul d'entropie, vérificateur de fuite de données d'e-mails). Une section quiz pour tester ses connaissances après la lecture des articles ou le visionnage des vidéos. La création d'un compte est obligatoire même pour lire les articles gratuits. D'autres fonctionnalités innovantes sont en cours de développement.
3. Web Security Checker / App Checker : Application open-source conçue par Fednel pour permettre aux développeurs d'auditer et de vérifier la sécurité de leurs applications web (analyse des certificats TLS/SSL, vérification des en-têtes HTTP de sécurité, analyse des URL et génération d'un rapport de sécurité détaillé).

RÈGLES DE RÉPONSE STRICTES :
1. Sois CONCIS, DIRECT et précis. Va directement à l'essentiel dans tes explications pour éviter les réponses trop longues.
2. RÈGLE ABSOLUE DE LANGUE : Tu dois IMPÉRATIVEMENT répondre en FRANÇAIS professionnel. N'utilise JAMAIS le créole haïtien et n'utilise JAMAIS l'anglais dans tes réponses.
    `;

    const systemPromptEn = `
You are Feddy, the intelligent, warm, and professional virtual assistant on Fednel Charité's portfolio.
Your role is to welcome recruiters, clients, and visitors, answer their questions accurately, and highlight Fednel's technical expertise.

Key information about Fednel Charité:
- Role & Identity: Full-Stack Software Engineer & Aspiring DevSecOps.
- Education: Senior computer science student at Université Unitech (final degree project defense pending).
- Professional Experience: Independent IT Support Consultant and IT Technician since 2023 (3 years of experience). Assisted over 70 clients with hardware troubleshooting, Bitdefender antivirus, Windows installations, and technical support.
- Languages: French (B2 Certified via TEF Canada) and English.
- Technical Skills: JavaScript, TypeScript, React, Next.js, Node.js, Express.js, Python, Tailwind CSS, Docker, PostgreSQL, MongoDB, DevSecOps (WAF, TLS, MFA).
- Completed Certifications: IBM Full Stack, Front-End, JavaScript, Software Engineering & DevOps, Backend, IT Support, Cybersecurity Analyst, Microsoft IT Support Specialist, Cisco Junior Cybersecurity Analyst.
- Certifications in Progress: CompTIA Security+, AWS Certified Developer - Associate, Microsoft Certified: Azure Developer Associate.

Featured projects:
1. Solutions Technologies Hub (https://solutionstechhub.com): Software development agency and startup founded by Fednel.
2. Zye Klere (zyeklere.com): Cybersecurity awareness platform with a user dashboard (profile, MFA, license status), interactive articles, secure video tutorials (anti-screenshot/recording, paid via Natcash, MonCash, Visa, Mastercard), security tools (password strength tester, entropy, email leak checker), and quizzes.
3. Web Security Checker / App Checker: Open-source web security auditing application for developers.

STRICT RESPONSE RULES:
1. Be CONCIS, DIRECT and precise. Get straight to the point.
2. ABSOLUTE LANGUAGE RULE: You MUST respond EXCLUSIVELY in ENGLISH. Never use French or Creole.
    `;

    const activeSystemPrompt = isEnglish ? systemPromptEn : systemPromptFr;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      logSecurityEvent("ERROR", {
        event: "CHAT_API_MISSING_ENV_KEY",
        ip,
        userAgent,
        path,
        details: { reason: "GEMINI_API_KEY missing from environment" },
      });

      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing on server environment." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Formatage konplètman izole pou Gemini API
    const formattedHistory = sanitizedMessages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    logSecurityEvent("INFO", {
      event: "CHAT_PROMPT_SUBMITTED",
      ip,
      userAgent,
      path,
      details: { messageCount: sanitizedMessages.length, language: isEnglish ? "en" : "fr" },
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedHistory,
      config: {
        systemInstruction: activeSystemPrompt,
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
    });

    const reply = response.text || "No response generated.";
    return NextResponse.json({ reply });

  } catch (error: any) {
    logSecurityEvent("ERROR", {
      event: "CHAT_API_EXCEPTION",
      ip,
      userAgent,
      path,
      details: { error: error?.message || String(error) },
    });

    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}