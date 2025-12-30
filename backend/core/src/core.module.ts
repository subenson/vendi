import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { PrefixedUlid } from './utils/prefixed-ulid.util';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TenantGuard } from './multi-tenancy/guards/tenant.guard';
import { ValidationPipe } from './validation/validation.pipe';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [
    JwtAuthGuard,
    PrefixedUlid,
    TenantGuard,
    ValidationPipe,
  ],
  exports: [
    JwtAuthGuard,
    PrefixedUlid,
    TenantGuard,
    ValidationPipe,
    JwtModule,
  ],
})
export class CoreModule {}
