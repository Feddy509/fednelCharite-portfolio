"use client";

import Image from "next/image";
import { Terminal } from "lucide-react";
import styles from "./HeroIllustration.module.css";

export default function HeroIllustration() {
  return (
    <div className={styles.container}>
      {/* ---------------------------------------------------------------- */}
      {/* Formes SVG d'arrière-plan (Cercles & Arcs)                       */}
      {/* ---------------------------------------------------------------- */}
      <svg
        className={styles.heroSvg}
        viewBox="0 0 760 760"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Contour extérieur — ouvert en bas (arc de 270°, gap de 90°
            centré à 6h) pour laisser "sortir" la photo à travers */}
        <path
          d="M167.3 602.7 A315 315 0 1 1 612.7 602.7"
          className={styles.outlineCircle}
        />

        {/* Arc gris extérieur */}
        <circle
          cx="390"
          cy="380"
          r="255"
          className={styles.grayArc}
        />

        {/* Arc bleu principal */}
        <circle
          cx="390"
          cy="380"
          r="205"
          className={styles.blueArc}
        />

        {/* Arc intérieur */}
        <circle
          cx="390"
          cy="380"
          r="150"
          className={styles.innerArc}
        />
      </svg>

      {/* ---------------------------------------------------------------- */}
      {/* Effet d'éclairage (Glow)                                         */}
      {/* ---------------------------------------------------------------- */}
      <div className={styles.glow} />

      {/* ---------------------------------------------------------------- */}
      {/* Badge/Carte Terminal                                             */}
      {/* ---------------------------------------------------------------- */}
      <div className={styles.terminalCard}>
        <Terminal size={22} />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Photo de profil principale                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className={styles.photoContainer}>
        <Image
          src="/images/fednel-transparent.png"
          alt="Fednel Charité"
          width={760}
          height={980}
          priority
          className={styles.photo}
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Éléments de décoration / Flous d'ambiance                        */}
      {/* ---------------------------------------------------------------- */}
      <div className={styles.blurOne} />
      <div className={styles.blurTwo} />
    </div>
  );
}