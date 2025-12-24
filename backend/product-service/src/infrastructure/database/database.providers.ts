import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error('MONGODB_URI environment variable is not set');
      }
      return mongoose.connect(uri);
    },
  },
];
