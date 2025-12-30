import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpValidationException extends HttpException {
  constructor(errors: { property: string; constraints: string[] }[]) {
    super(
      {
        reason: 'validation_error',
        errors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
