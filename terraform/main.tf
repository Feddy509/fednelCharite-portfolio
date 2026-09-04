# ==============================================================================
# FR: Infrastructure as Code (IaC) - Security Hardening & Cloudflare WAF
# EN: Infrastructure as Code (IaC) - Cloudflare Security Hardening & WAF
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

# ------------------------------------------------------------------------------
# 1. GESTION DES VARIABLES ET SECRETS / VARIABLES & SECRET MANAGEMENT
# ------------------------------------------------------------------------------

variable "cloudflare_api_token" {
  type        = string
  description = "Cloudflare API Token for domain and WAF management"
  sensitive   = true
}

variable "zone_id" {
  type        = string
  description = "Cloudflare Zone ID for fednelcharite.site"
  sensitive   = true
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# ------------------------------------------------------------------------------
# 2. RENFORCEMENT HTTPS & PARAMÈTRES DE SÉCURITÉ / HTTPS HARDENING
# ------------------------------------------------------------------------------

resource "cloudflare_zone_settings_override" "fednelcharite_security" {
  zone_id = var.zone_id

  settings {
    ssl                      = "strict"
    always_use_https         = "on"
    min_tls_version          = "1.2"
    automatic_https_rewrites = "on"
    browser_check            = "on"
    security_level           = "medium"
  }
}

# ------------------------------------------------------------------------------
# 3. RÈGLE PARE-FEU WEB (WAF) / WEB APPLICATION FIREWALL (WAF) BOT BLOCKING
# ------------------------------------------------------------------------------

# FR: Filtre d'inspection des User-Agents suspects
# EN: Filter inspecting suspicious User-Agent headers
resource "cloudflare_filter" "bad_bots" {
  zone_id     = var.zone_id
  description = "Filter bad bots and automated scanners"
  expression  = "(http.user_agent contains \"python-requests\") or (http.user_agent contains \"libwww-perl\")"
}

# FR: Règle de blocage automatique des bots malveillants
# EN: Firewall rule blocking malicious automated requests
resource "cloudflare_firewall_rule" "block_bad_bots" {
  zone_id     = var.zone_id
  description = "Block known bad bots from accessing fednelcharite.site"
  filter_id   = cloudflare_filter.bad_bots.id
  action      = "block"
}