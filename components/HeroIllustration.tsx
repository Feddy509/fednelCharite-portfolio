"use client";

import Image from "next/image";
import { Terminal } from "lucide-react";
import styles from "./HeroIllustration.module.css";

export default function HeroIllustration() {
  return (
    <div className={styles.container}>
      {/* ---------------------------------------------------------------- */}
      {/* SVG Shapes (Grand secteur blanc + Arc bleu élargis)             */}
      {/* ---------------------------------------------------------------- */}
      <svg
        className={styles.heroSvg}
        viewBox="0 0 750 750"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Grand fond blanc solide */}
        <path
          d="M 375 375 L 100 740 A 420 420 0 0 1 720 130 Z"
          className={styles.courseraWhiteFill}
        />

        {/* 2. Secteur bleu massif */}
        <path
          d="M 375 375 L 200 680 A 330 330 0 0 1 660 200 Z"
          className={styles.courseraBlueFill}
        />

        {/* 3. Ligne d'accentuation fine */}
        <path
          d="M 210 670 A 320 320 0 0 1 650 210"
          className={styles.innerLine}
        />
      </svg>

      {/* Badge Terminal */}
      <div className={styles.terminalBadge}>
        {Terminal ? <Terminal size={22} /> : null}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Photo de profil élargie et étirée vers les lignes vertes       */}
      {/* ---------------------------------------------------------------- */}
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

      <div className={styles.glowEffect} />
    </div>
  );
}