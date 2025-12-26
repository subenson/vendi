import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTenantException extends HttpException {
    constructor() {
        super('Invalid tenant', HttpStatus.UNAUTHORIZED);
    }
}
