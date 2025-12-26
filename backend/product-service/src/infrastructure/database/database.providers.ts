import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const uri = configService.get<string>('MONGODB_URI');
      if (!uri) {
        throw new Error('MONGODB_URI environment variable is not set');
      }
      return mongoose.connect(uri);
    },
    inject: [ConfigService],
  },
];
