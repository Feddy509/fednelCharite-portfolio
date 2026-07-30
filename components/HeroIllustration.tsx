"use client";

import Image from "next/image";
import { Terminal } from "lucide-react";
import styles from "./HeroIllustration.module.css";

export default function HeroIllustration() {
  return (
    <div className={styles.container}>
      {/* ---------------------------------------------------------------- */}
      {/* SVG Coursera Shapes (Grand secteur blanc + Arc bleu)            */}
      {/* ---------------------------------------------------------------- */}
      <svg
        className={styles.heroSvg}
        viewBox="0 0 700 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Grand fond blanc solide en forme de camembert / secteur */}
        <path
          d="M 350 350 L 120 700 A 380 380 0 0 1 680 150 Z"
          className={styles.courseraWhiteFill}
        />

        {/* 2. Secteur bleu massif posé par-dessus */}
        <path
          d="M 350 350 L 220 650 A 300 300 0 0 1 620 220 Z"
          className={styles.courseraBlueFill}
        />

        {/* 3. Ligne d'accentuation fine à l'intérieur */}
        <path
          d="M 230 640 A 290 290 0 0 1 610 230"
          className={styles.innerLine}
        />
      </svg>

      {/* Badge Terminal sur la forme bleue */}
      <div className={styles.terminalBadge}>
        <Terminal size={22} />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Photo de profil superposée à droite                             */}
      {/* ---------------------------------------------------------------- */}
      <div className={styles.photoWrapper}>
        <Image
          src="/images/fednel-transparent.png"
          alt="Fednel Charité"
          width={700}
          height={850}
          priority
          className={styles.photo}
        />
      </div>

      <div className={styles.glowEffect} />
    </div>
  );
}