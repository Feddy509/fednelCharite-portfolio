# 🛡️ DevSecOps Portfolio Infrastructure - fednelcharite.site

[![DevSecOps Pipeline](https://github.com/Feddy509/fednelCharite-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Feddy509/fednelCharite-portfolio/actions/workflows/ci.yml)
[![Security: CodeQL](https://img.shields.io/badge/SAST-CodeQL-blue.svg)](https://github.com/github/codeql)
[![Secret Scan: Gitleaks](https://img.shields.io/badge/Secrets-Gitleaks-green.svg)](https://github.com/gitleaks/gitleaks)
[![Container Scan: Trivy](https://img.shields.io/badge/Container%20Scan-Trivy-brightgreen.svg)](https://github.com/aquasecurity/trivy)
[![Supply Chain: Cosign](https://img.shields.io/badge/Signing-Cosign%20OIDC-orange.svg)](https://github.com/sigstore/cosign)
[![IaC: Terraform & Checkov](https://img.shields.io/badge/IaC-Checkov-purple.svg)](https://github.com/bridgecrewio/checkov)

Personal software engineering & DevSecOps portfolio of **Fednel Charité** ([fednelcharite.site](https://fednelcharite.site)). Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Docker**, fully secured and automated through an enterprise-grade **DevSecOps Pipeline**.

---

## 🏗️ DevSecOps Pipeline Architecture / Architecture du Pipeline

```mermaid
graph TD
    A[Dev: Local Code Commit] -->|Git Push| B[GitHub Actions CI/CD]
    
    subgraph Security Gates
        B --> C[Gitleaks: Secret Leak Detection]
        B --> D[CodeQL: SAST Analysis]
        B --> E[Checkov: IaC Terraform Scan]
        B --> F[Trivy: SCA Dependency Audit]
    end

    C --> G[Build Docker Image]
    D --> G
    E --> G
    F --> G

    subgraph Container & Supply Chain
        G --> H[Trivy: Docker Vulnerability Scan]
        H --> I[Syft: Generate SPDX SBOM]
        I --> J[Cosign: Keyless OIDC Image Signing]
    end

    subgraph Production Runtime Protection
        J --> K[Deployment: Next.js Standalone Container]
        K --> L[Cloudflare WAF & Edge Security]
        K --> M[Upstash Redis: Rate Limiting]
        K --> N[Structured JSON Security Logging / SIEM]
    end

********************************************************************************************************
🔒 Implemented Security Features
1. Automated Security Gates (CI/CD)
Secret Scanning: Gitleaks blocks hardcoded API keys and credentials before merging.

SAST (Static Testing): CodeQL detects TypeScript/React vulnerability patterns (XSS, Injection).

SCA (Dependency Security): Trivy scans pnpm-lock.yaml for high/critical CVEs.

IaC Security: Checkov audits Terraform infrastructure configurations.

2. Container & Supply Chain Security
Hardened Dockerfile: Multi-stage build running under an isolated non-root user (nextjs:1001).

Software Bill of Materials (SBOM): Automatically generated via Syft in SPDX-JSON format.

Keyless Signing: Container images signed using Cosign via GitHub Actions OIDC.

3. Application Security (AppSec) & Runtime Protection
Strict Headers: CSP, HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff.

Anti-Abuse & Anti-Bot: Integrated Cloudflare Turnstile & Upstash Redis rate-limiting.

Observability: Structured JSON security logging with automatic PII Sanitation (lib/logger.ts).    

***********************************************************************************************************

Fonctionnalités de Sécurité Implémentées
1. Contrôles de Sécurité Automatisés (CI/CD)
Détection de Secrets : Gitleaks bloque les clés API et identifiants exposés avant tout commit.

SAST (Analyse Statique) : CodeQL détecte les failles de sécurité TypeScript/React (XSS, Injection).

SCA (Sécurité des Dépendances) : Trivy analyse le fichier pnpm-lock.yaml pour éliminer les vulnérabilités CVE.

Sécurité IaC : Checkov audite la configuration des fichiers d'infrastructure Terraform.

2. Sécurité des Conteneurs & Supply Chain
Dockerfile Sécurisé : Construction multi-étapes exécutée sous un utilisateur non-root isolé (nextjs:1001).

Nomenclature Logicielle (SBOM) : Génération automatique au format SPDX-JSON via Syft.

Signature Cryptographique : Images conteneurs signées sans clé privée via Cosign et GitHub Actions OIDC.

3. Sécurité Applicative (AppSec) & Protection au Runtime
En-têtes Stricts : Configuration renforcée de CSP, HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff.

Anti-Abus et Anti-Bot : Protection intégrée via Cloudflare Turnstile et gestion de limite de requêtes avec Upstash Redis.

Observabilité : Journalisation structurée au format JSON compatible SIEM avec masquage automatique des données personnelles (PII) (lib/logger.ts).

🚀 Local Development / Développement Local
# Clone the repository / Cloner le dépôt
git clone [https://github.com/Feddy509/fednelCharite-portfolio.git](https://github.com/Feddy509/fednelCharite-portfolio.git)
cd fednelCharite-portfolio

# Install dependencies / Installer les dépendances
pnpm install

# Run development server / Lancer le serveur de développement
pnpm dev

🐳 Docker Deployment / Déploiement Docker
# Build local hardened container / Construire l'image Docker sécurisée
docker build -t fednel-portfolio:latest .

# Run container locally / Exécuter le conteneur en local
docker run -p 3000:3000 fednel-portfolio:latest

📬 Security Reporting / Signalement de Faille
For security concerns or vulnerability disclosure, refer to our SECURITY.md policy.

Pour tout signalement de vulnérabilité, veuillez consulter notre politique SECURITY.md.

Developer par Fednel Charite
Build by Fednel Charite