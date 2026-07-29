import Link from "next/link";
import { Github, Linkedin, Globe, Mail } from "lucide-react";
import { navLinks, personalInfo } from "@/data/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: personalInfo.social.github, icon: Github },
    { label: "LinkedIn", href: personalInfo.social.linkedin, icon: Linkedin },
    { label: "Site", href: personalInfo.social.website, icon: Globe },
    { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
  ];

  return (
    <footer className="border-t border-white/5 bg-ink-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="font-sans text-sm font-semibold text-paper">
              {personalInfo.name}
            </Link>
            <p className="mt-2 font-sans text-sm leading-relaxed text-paper/55">
              {personalInfo.roles.join(" · ")}
            </p>
          </div>

          <div className="flex gap-8 sm:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-paper/40">
                Navigation
              </p>
              <ul className="mt-3 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-paper/60 transition hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-paper/40">
                Connecter
              </p>
              <ul className="mt-3 space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-sans text-sm text-paper/60 transition hover:text-paper"
                    >
                      <s.icon size={14} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-paper/35">
            © {year} {personalInfo.name}. Tous droits réservés.
          </p>
          <p className="font-mono text-xs text-paper/35">
            Conçu &amp; développé avec Next.js + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
