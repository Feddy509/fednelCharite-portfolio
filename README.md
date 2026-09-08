# DevSecOps Portfolio Infrastructure - fednelcharite.site

[![CI Quality & Security Gate](https://img.shields.io/badge/SonarCloud-passing-brightgreen)](https://sonarcloud.io/dashboard?id=Fednel_Charite_fednelCharite-portfolio)
[![SAST CodeQL](https://github.com/Feddy509/fednelCharite-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Feddy509/fednelCharite-portfolio/actions/workflows/ci.yml)
[![Secrets Gitleaks](https://img.shields.io/badge/Secrets-Gitleaks-blue)](https://github.com/gitleaks/gitleaks)
[![Infrastructure as Code Checkov](https://img.shields.io/badge/IaC-Checkov-orange)](https://www.checkov.io/)

Production-grade, highly hardened software engineering portfolio infrastructure for [fednelcharite.site](https://fednelcharite.site). Built with Next.js, TypeScript, and Tailwind CSS, orchestrated with Docker, automated via Terraform and Ansible, and secured through a rigorous end-to-end DevSecOps pipeline.

---

## 🏗️ Architecture & Infrastructure Workflow / Architecture et Flux d'Infrastructure

This project implements a complete Infrastructure as Code (IaC) and Configuration Management lifecycle, ensuring zero manual intervention from code commit to production deployment.

[ Local Dev / Git Push ]
│
▼
[ GitHub Actions CI/CD Pipeline ]
├── Security Gates: Gitleaks (Secrets) + CodeQL (SAST) + Checkov (IaC) + SonarCloud (Quality Gate)
├── Container & Supply Chain: Docker Build + Trivy + Syft (SBOM) + Cosign (OIDC Signing)
└── Infrastructure Provisioning: Terraform (Cloud Resources) & Ansible (Nginx Reverse Proxy & Hardening)

---

## 🔒 Security & DevOps Features / Fonctionnalités de Sécurité et DevOps

### 1. Automated Security Gates & Code Quality (CI/CD)
* **SonarCloud Quality Gate:** Enforces continuous code quality, tracking security ratings (A/B minimum), technical debt, code smells, and coverage.
* **Secret Leak Detection:** *Gitleaks* scans every commit to block hardcoded API keys and credentials before code reaches the repository.
* **Static Application Security Testing (SAST):** *CodeQL* analyzes TypeScript and React vulnerability patterns (XSS, Injection).
* **IaC Security:** *Checkov* audits Terraform infrastructure files for cloud security misconfigurations.

### 2. Infrastructure & Configuration Management (Terraform & Ansible)
* **Terraform:** Automatically provisions clean, reproducible cloud infrastructure resources.
* **Ansible:** Configures target servers, handles system-level hardening, and provisions **Nginx** as a secure *Reverse Proxy* routing traffic to the Next.js container securely.

### 3. Container & Supply Chain Security
* **Hardened Dockerfile:** Multi-stage build running under an isolated, non-root user (`nextjs:1001`) to minimize attack vectors.
* **Vulnerability Scanning & SBOM:** *Trivy* scans container images for CVEs, while *Syft* generates automated Software Bills of Materials (SBOM) in SPDX-JSON format.
* **Keyless Image Signing:** Container images are cryptographically signed using *Cosign* via GitHub Actions OIDC.

### 4. Runtime & Application Defense (AppSec)
* **Strict HTTP Security Headers:** Enforces CSP, HSTS, X-Frame-Options: DENY, and X-Content-Type-Options: nosniff.
* **Anti-Abuse & Rate Limiting:** Protected via Cloudflare WAF/Turnstile and Upstash Redis rate-limiting.
* **Observability:** Structured JSON security logging with automatic PII sanitization (`lib/logger.ts`).

---

## 🚀 Local Development / Développement Local

### Clone the repository / Cloner le dépôt
```bash
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
For security concerns or vulnerability disclosure, please refer to our SECURITY.md policy.

Pour tout signalement de vulnérabilité, veuillez consulter notre politique [SECURITY.md].