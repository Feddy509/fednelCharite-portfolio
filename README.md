# DevSecOps Portfolio Infrastructure - fednelcharite.site

[![CI Quality & Security Gate](https://img.shields.io/badge/SonarCloud-passing-brightgreen)](https://sonarcloud.io/dashboard?id=Fednel_Charite_fednelCharite-portfolio)
[![SAST CodeQL](https://github.com/Feddy509/fednelCharite-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Feddy509/fednelCharite-portfolio/actions/workflows/ci.yml)
[![Secrets Gitleaks](https://img.shields.io/badge/Secrets-Gitleaks-blue)](https://github.com/gitleaks/gitleaks)
[![Infrastructure as Code Checkov](https://img.shields.io/badge/IaC-Checkov-orange)](https://www.checkov.io/)

---

## 🌐 Overview / Vue d'ensemble

**[EN]** Production-grade, highly hardened software engineering portfolio infrastructure for [fednelcharite.site](https://fednelcharite.site). Built with Next.js, TypeScript, and Tailwind CSS, orchestrated with Docker, automated via Terraform and Ansible, and secured through a rigorous end-to-end DevSecOps pipeline.

**[FR]** Infrastructure de portfolio en génie logiciel hautement sécurisée et de niveau production pour [fednelcharite.site](https://fednelcharite.site). Développée avec Next.js, TypeScript et Tailwind CSS, orchestrée avec Docker, automatisée via Terraform et Ansible, et sécurisée par un pipeline DevSecOps rigoureux.

---

## 🏗️ Architecture & Infrastructure Workflow / Architecture et Flux d'Infrastructure

**[EN]** This project implements a complete Infrastructure as Code (IaC) and Configuration Management lifecycle, ensuring zero manual intervention from code commit to production deployment.

**[FR]** Ce projet implémente un cycle de vie complet d'infrastructure en tant que code (IaC) et de gestion de configuration, garantissant zéro intervention manuelle du commit jusqu'au déploiement en production.

```text
[ Local Dev / Git Push ] 
        │
        ▼
[ GitHub Actions CI/CD Pipeline ]
        ├── Security Gates: Gitleaks (Secrets) + CodeQL (SAST) + Checkov (IaC) + SonarCloud (Quality Gate)
        ├── Container & Supply Chain: Docker Build + Trivy + Syft (SBOM) + Cosign (OIDC Signing)
        └── Infrastructure Provisioning: Terraform (Cloud Resources) & Ansible (Nginx Reverse Proxy & Hardening)

        ```

---

🔒 Security & DevOps Features / Fonctionnalités de Sécurité et DevOps
1. Automated Security Gates & Code Quality / Contrôles Automatisés et Qualité de Code
[EN] SonarCloud Quality Gate: Enforces continuous code quality, tracking security ratings, technical debt, and test coverage.

[FR] SonarCloud Quality Gate : Garantit la qualité continue du code, le suivi des notes de sécurité et de la dette technique.

[EN] Secret Leak Detection (Gitleaks): Blocks hardcoded API keys and credentials before code reaches the repository.

[FR] Détection de Secrets (Gitleaks) : Bloque l'exposition de clés API et d'identifiants avant tout commit.

[EN] Static Application Security Testing (CodeQL): Analyzes TypeScript and React vulnerability patterns (XSS, Injection).

[FR] Analyse Statique (CodeQL) : Analyse les failles de sécurité dans TypeScript et React.

2. Infrastructure & Configuration Management / Gestion d'Infrastructure (Terraform & Ansible)
[EN] Terraform: Automatically provisions clean, reproducible cloud infrastructure resources.

[FR] Terraform : Provisionne automatiquement des ressources cloud propres et reproductibles.

[EN] Ansible: Configures target servers, performs system hardening, and sets up Nginx as a secure Reverse Proxy for the Next.js container.

[FR] Ansible : Configure les serveurs cibles, gère le durcissement système et met en place Nginx comme Reverse Proxy sécurisé.

3. Container & Supply Chain / Sécurité des Conteneurs
[EN] Hardened Dockerfile: Multi-stage build running under an isolated, non-root user (nextjs:1001).

[FR] Dockerfile Sécurisé : Construction multi-étapes exécutée sous un utilisateur non-root isolé (nextjs:1001).

[EN] Vulnerability & SBOM (Trivy & Syft): Scans container images for CVEs and generates automated SBOMs.

[FR] Vulnérabilités & SBOM (Trivy & Syft) : Analyse les conteneurs et génère une nomenclature logicielle (SBOM).

---

🚀 Local Development / Développement Local
Clone the repository / Cloner le dépôt

git clone [https://github.com/Feddy509/fednelCharite-portfolio.git](https://github.com/Feddy509/fednelCharite-portfolio.git)
cd fednelCharite-portfolio

Install dependencies / Installer les dépendances

pnpm install
Run development server / Lancer le serveur de développement

pnpm dev
🐳 Docker & Deployment / Déploiement Docker
Build local hardened container / Construire l'image Docker sécurisée

docker build -t fednel-portfolio:latest .
Run container locally / Exécuter le conteneur en local

docker run -p 3000:3000 fednel-portfolio:latest
🛡️ Security Reporting / Signalement de Failles
[EN] For security concerns or vulnerability disclosure, please refer to our SECURITY.md policy.

[FR] Pour tout signalement de vulnérabilité, veuillez consulter notre politique SECURITY.md.