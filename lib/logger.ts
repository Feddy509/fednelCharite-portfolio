type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'SECURITY';

interface SecurityLogPayload {
  event: string;
  ip?: string;
  userAgent?: string;
  path?: string;
  details?: Record<string, unknown>;
}

// Fonksyon pou kache done sansib (PII Sanitation)
function sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized = { ...data };
  const sensitiveKeys = ['email', 'password', 'token', 'apiKey', 'name', 'phone'];

  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some((sensitive) => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED_PII]';
    }
  }

  return sanitized;
}

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

  // Nòmalize pou voye sou STDOUT/STDERR sou fòm JSON (Konfòm ak SIEM / CloudWatch / Datadog)
  const formattedLog = JSON.stringify(logEntry);

  if (level === 'ERROR' || level === 'SECURITY') {
    console.error(formattedLog);
  } else {
    console.log(formattedLog);
  }
}