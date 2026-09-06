import Image from "next/image";
import { Terminal } from "lucide-react";
import styles from "./HeroIllustration.module.css";

/**
 * ==============================================================================
 * FR: Composant d'Illustration Visuelle de la Section Hero
 * EN: Hero Section Visual Illustration Component
 * ==============================================================================
 * 
 * FR: Assemble la composition graphique vectorielle (SVG), le badge terminal
 *     et le portrait photographique principal de la page d'accueil.
 * EN: Combines vector graphics composition (SVG), terminal badge,
 *     and the primary photographic portrait for the home page.
 */
export default function HeroIllustration() {
  return (
    <div className={styles.container}>
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. COMPOSITION SVG VECTORIELLE / VECTOR SVG GRAPHICS              */}
      {/* ------------------------------------------------------------------ */}
      <svg
        className={styles.heroSvg}
        viewBox="0 0 750 750"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* FR: Grand secteur de fond blanc / EN: Large solid white background sector */}
        <path
          d="M 375 375 L 100 740 A 420 420 0 0 1 720 130 Z"
          className={styles.courseraWhiteFill}
        />

        {/* FR: Secteur bleu d'accentuation / EN: Massive blue accent sector */}
        <path
          d="M 375 375 L 200 680 A 330 330 0 0 1 660 200 Z"
          className={styles.courseraBlueFill}
        />

        {/* FR: Ligne d'accentuation interne / EN: Inner subtle accent line */}
        <path
          d="M 210 670 A 320 320 0 0 1 650 210"
          className={styles.innerLine}
        />
      </svg>

      {/* ------------------------------------------------------------------ */}
      {/* 2. BADGE TERMINAL / TERMINAL ICON BADGE                            */}
      {/* ------------------------------------------------------------------ */}
      <div className={styles.terminalBadge}>
        {Terminal ? <Terminal size={22} /> : null}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. PORTRAIT PHOTOGRAPHIQUE OPTIMISÉ / OPTIMIZED PORTRAIT IMAGE     */}
      {/* ------------------------------------------------------------------ */}
      <div className={styles.photoWrapper}>
        <Image
          src="/images/fednel-transparent.png"
          alt="Fednel Charité"
          width={750}
          height={900}
          priority
          className={styles.photo}
        />
      </div>

      {/* FR: Effet de lueur d'arrière-plan / EN: Background glow blur effect */}
      <div className={styles.glowEffect} />
    </div>
  );
}