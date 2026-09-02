# 🛡️ Security Policy / Politique de Sécurité

---

## 🇺🇸 English Version

## Supported Versions
We take the security of **fednelcharite.site** seriously. The following table outlines the supported versions of this project:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

## Reporting a Vulnerability
If you discover a security vulnerability within this repository or associated deployed infrastructure, please report it responsibly instead of opening a public GitHub issue.

### How to Submit a Security Report
- **Email:** Send details to [contact@fednelcharite.site](mailto:contact@fednelcharite.site)
- **Encryption:** Use standard PGP or encrypted email if sending sensitive proof-of-concept data.

Please include the following in your report:
1. Type of vulnerability (e.g., XSS, Rate Limit Bypass, Dependency CVE).
2. Step-by-step instructions or proof-of-concept (PoC) script to reproduce the issue.
3. Potential impact of the issue.

### Our Security Response Commitment
- **Acknowledgment:** Within 24–48 hours.
- **Triage & Status Update:** Within 3–5 business days.
- **Patch & Disclosure:** A fix will be developed and pushed through our automated DevSecOps pipeline (`.github/workflows/ci.yml`).

## Automated Security Controls
This repository enforces:
- **Secret Scanning:** Gitleaks pre-commit & CI checks.
- **SAST:** CodeQL static application analysis.
- **SCA & Container Audit:** Trivy dependency and Docker vulnerability scanning.
- **IaC Scanning:** Checkov static analysis for Terraform configurations.
- **Supply Chain Security:** Software Bill of Materials (SBOM) generation via Syft and Keyless OIDC signing via Cosign.

---

## 🇫🇷 Version Française

## Versions Supportées
Nous prenons la sécurité de **fednelcharite.site** très au sérieux. Le tableau ci-dessous indique les versions actuellement maintenues :

| Version | Supportée          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

## Signalement d'une Vulnérabilité
Si vous découvrez une faille de sécurité dans ce dépôt ou sur l'infrastructure déployée associée, merci de la signaler de manière responsable au lieu d'ouvrir une issue publique sur GitHub.

### Comment Soumettre un Rapport de Sécurité
- **Email :** Envoyez les détails à [contact@fednelcharite.site](mailto:contact@fednelcharite.site)
- **Chiffrement :** Utilisez PGP ou un e-mail chiffré pour l'envoi de données de preuve de concept (PoC) sensibles.

Veuillez inclure les éléments suivants dans votre rapport :
1. Le type de vulnérabilité (ex. XSS, contournement de limite de requêtes, CVE de dépendance).
2. Les instructions étape par étape ou le script de preuve de concept (PoC) pour reproduire le problème.
3. L'impact potentiel de la faille.

### Notre Engagement de Réponse
- **Accusé de réception :** Sous 24 à 48 heures.
- **Évaluation & Mise à jour :** Sous 3 à 5 jours ouvrés.
- **Correctif & Publication :** Un correctif sera développé et déployé via notre pipeline DevSecOps automatisé (`.github/workflows/ci.yml`).

## Contrôles de Sécurité Automatisés
Ce dépôt applique obligatoirement :
- **Détection de Secrets :** Vérifications Gitleaks en pre-commit et dans le pipeline CI.
- **SAST :** Analyse statique du code applicatif avec CodeQL.
- **SCA & Audit de Conteneur :** Analyse des dépendances et vulnérabilités Docker avec Trivy.
- **Sécurité IaC :** Analyse statique des configurations Terraform avec Checkov.
- **Sécurité de la Supply Chain :** Génération de nomenclature logicielle (SBOM) via Syft et signature cryptographique sans clé via Cosign (OIDC).