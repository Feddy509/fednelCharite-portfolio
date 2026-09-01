# Security Policy

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
- **Acknowledgment:** Within 24-48 hours.
- **Triage & Status Update:** Within 3-5 business days.
- **Patch & Disclosure:** A fix will be developed and pushed through our automated DevSecOps pipeline (`.github/workflows/ci.yml`).

## Automated Security Controls
This repository enforces:
- **Secret Scanning:** Gitleaks pre-commit & CI checks.
- **SAST:** CodeQL static application analysis.
- **SCA & Container Audit:** Trivy dependency and Docker vulnerability scanning.
- **IaC Scanning:** Checkov static analysis for Terraform configurations.
- **Supply Chain Security:** Software Bill of Materials (SBOM) generation via Syft and Keyless OIDC signing via Cosign.