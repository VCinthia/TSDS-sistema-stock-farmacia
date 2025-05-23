export enum ErrorCodes {
  // Errores de Validación (400)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_DATE = 'INVALID_DATE',

  // Errores de Autenticación (401/403)
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',

  // Errores de Recursos (404/409)
  NOT_FOUND = 'NOT_FOUND',

  // Errores del Servidor (500)
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}