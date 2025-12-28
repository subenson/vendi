import { Module } from '@nestjs/common';
import { StatusRequestHandler } from './application/request-handler/status.request-handler';
import { databaseProviders } from './infrastructure/database/database.providers';
import { ConfigModule } from '@nestjs/config';
import { MultiTenancyModule } from '@vendi/multi-tenancy';
import { ProductsRequestHandler } from './application/request-handler/products.request-handler';

@Module({
  imports: [ConfigModule.forRoot(), MultiTenancyModule],
  controllers: [StatusRequestHandler, ProductsRequestHandler],
  providers: [...databaseProviders],
})
export class ProductModule {}
