import { Injectable } from '@nestjs/common';
import { HealthResponse } from '@repo/contracts';

@Injectable()
export class HealthService {
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'marketplace-api',
      timestamp: new Date().toISOString(),
    };
  }
}
