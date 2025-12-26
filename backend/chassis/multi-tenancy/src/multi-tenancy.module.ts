import { Module } from '@nestjs/common';
import { TenantGuard } from './guards/tenant.guard';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
    })
  ],
  providers: [TenantGuard],
  exports: [TenantGuard],
})
export class MultiTenancyModule {}
