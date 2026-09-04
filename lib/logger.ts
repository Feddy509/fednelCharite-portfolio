/**
 * ==============================================================================
 * FR: Module de Journalisation Structurée DevSecOps / Logger (TypeScript)
 * EN: DevSecOps Structured Security Logging Module (TypeScript)
 * ==============================================================================
 * 
 * FR: Fournit un système de logs JSON enrichi, nettoyé des données PII
 *     et prêt pour l'ingestion SIEM / CloudWatch.
 * EN: Provides enriched JSON security log entries, sanitized for PII
 *     and ready for SIEM / CloudWatch ingestion.
 */

/**
 * FR: Niveaux de sévérité des événements de journalisation
 * EN: Security log severity levels
 */
type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'SECURITY';

/**
 * FR: Structure des données pour un événement de sécurité
 * EN: Payload structure for security log entries
 */
interface SecurityLogPayload {
  event: string;
  ip?: string;
  userAgent?: string;
  path?: string;
  details?: Record<string, unknown>;
}

/**
 * FR: Masque automatiquement les informations personnelles identifiables (PII)
 * EN: Automatically redacts personally identifiable information (PII)
 * 
 * @param data FR: Objet de détails brut / EN: Raw details payload
 * @returns FR: Objet nettoyé de ses clés sensibles / EN: Sanitized payload
 */
function sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized = { ...data };
  
  // FR: Liste explicite des clés PII et secrets (évite le masquage de nom générique comme project.name)
  // EN: Explicit PII and secret keys dictionary (prevents accidental masking of generic keys like project.name)
  const sensitiveKeys = [
    'email',
    'password',
    'passcode',
    'token',
    'apikey',
    'secret',
    'full_name',
    'user_name',
    'username',
    'phone_number',
    'telephone',
    'credit_card',
    'card_number',
    'ssn',
    'authorization'
  ];

  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some((sensitive) => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED_PII]';
    }
  }

  return sanitized;
}

/**
 * FR: Enregistre un événement de sécurité au format JSON sur STDOUT/STDERR
 * EN: Logs a structured security event in JSON format to STDOUT/STDERR
 * 
 * @param level FR: Niveau de log (INFO, WARN, ERROR, SECURITY) / EN: Log severity level
 * @param payload FR: Métadonnées de l'événement / EN: Event payload metadata
 */
export function logSecurityEvent(level: LogLevel, payload: SecurityLogPayload) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'fednel-portfolio',
    environment: process.env.NODE_ENV || 'development',
    event: payload.event,
    context: {
      ip: payload.ip || 'UNKNOWN',
      userAgent: payload.userAgent || 'UNKNOWN',
      path: payload.path || 'UNKNOWN',
      ...(payload.details ? sanitizeData(payload.details) : {}),
    },
  };

  // FR: Formate en JSON pour l'ingestion SIEM (Datadog, CloudWatch, Splunk)
  // EN: Formats as JSON string for SIEM log aggregators (Datadog, CloudWatch, Splunk)
  const formattedLog = JSON.stringify(logEntry);

  if (level === 'ERROR' || level === 'SECURITY') {
    console.error(formattedLog);
  } else {
    console.log(formattedLog);
  }
}