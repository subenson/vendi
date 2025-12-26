import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentTenant, TenantGuard } from '@vendi/multi-tenancy';

@Controller('products')
export class ProductsRequestHandler {

  @UseGuards(TenantGuard)
  @Get()
  list(@CurrentTenant() tenantId: string) {
    return {
      tenantId,
    };
  }
}
