/**
 * Shared API contracts and types
 */

export interface HealthResponse {
  status: 'ok' | 'error';
  service: string;
  timestamp: string;
}
