import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginRequestHandler } from './application/request-handler/login.request-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreModule } from '@vendi/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './domain/model/user.model';
import { SendLoginLinkHandler } from './application/command/send-login-link.handler';
import { dataSourceOptions } from './infrastructure/database/data-source';
import { LoginWithTokenHandler } from './application/command/login-with-token.handler';
import { RefreshTokenHandler } from './application/command/refresh-token.handler';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    CoreModule,
    TypeOrmModule.forRoot(dataSourceOptions as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [LoginRequestHandler],
  providers: [SendLoginLinkHandler, LoginWithTokenHandler, RefreshTokenHandler],
})
export class IdentityModule {}
