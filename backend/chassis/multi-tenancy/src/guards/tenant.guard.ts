import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { InvalidTenantException } from "../exceptions/invalid-tenant-exception";

@Injectable()
export class TenantGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const tenantId = request.query['tenantId'];
        if (!tenantId) throw new InvalidTenantException();

        request.tenantId = tenantId;
        return true;
    }
}
