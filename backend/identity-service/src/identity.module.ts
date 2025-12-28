import { Module } from '@nestjs/common';
import { databaseProviders } from './infrastructure/database/database.providers';
import { ConfigModule } from '@nestjs/config';
import { LoginRequestHandler } from './application/request-handler/login.request-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreModule } from '@vendi/core';

@Module({
  imports: [ConfigModule.forRoot(), CqrsModule.forRoot(), CoreModule],
  controllers: [LoginRequestHandler],
  providers: [...databaseProviders],
})
export class IdentityModule {}
