import { Controller, Get, Inject } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Controller('status')
export class StatusRequestHandler {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private connection: typeof mongoose,
  ) {}

  @Get()
  getStatus() {
    return {
      status: 'ok',
      database: {
        mongodb:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          this.connection.connection.readyState === 1
            ? 'connected'
            : 'disconnected',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
