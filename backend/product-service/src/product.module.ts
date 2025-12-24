import { Module } from '@nestjs/common';
import { StatusRequestHandler } from './application/requestHandler/status.request-handler';
import { databaseProviders } from './infrastructure/database/database.providers';

@Module({
  imports: [],
  controllers: [StatusRequestHandler],
  providers: [...databaseProviders],
})
export class ProductModule {}
