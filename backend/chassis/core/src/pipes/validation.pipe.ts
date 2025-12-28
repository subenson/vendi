import { HttpStatus, ValidationPipe as NestValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { UnprocessableEntityException } from '../exceptions/unprocessable-entity.exception';

export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((error) => ({
          property: error.property === 'undefined' ? 'class' : error.property,
          constraints: this.formatConstraints(error.constraints || {}),
        }));
        return new UnprocessableEntityException(formattedErrors);
      },
    });
  }

  private formatConstraints(constraints: Record<string, string>): string[] {
    const defaultMessages: Record<string, string> = {
      isString: 'must_be_string',
      isNumber: 'must_be_number',
      isBoolean: 'must_be_boolean',
      isEmail: 'must_be_valid_email',
      isUrl: 'must_be_valid_url',
      isUuid: 'must_be_valid_uuid',
      isNotEmpty: 'is_required',
      min: 'value_too_small',
      max: 'value_too_large',
      minLength: 'text_too_short',
      maxLength: 'text_too_long',
      isIn: 'invalid_value',
      matches: 'invalid_format',
      isDate: 'must_be_valid_date',
      isDateString: 'must_be_valid_date_string',
      isInt: 'must_be_integer',
      isPositive: 'must_be_positive',
      isNegative: 'must_be_negative',
      isDefined: 'is_required',
      arrayNotEmpty: 'array_cannot_be_empty',
      arrayMinSize: 'too_few_items',
      arrayMaxSize: 'too_many_items',
      isArray: 'must_be_array',
      whitelistValidation: 'field_not_allowed',
    };

    const formatted: string[] = [];

    for (const [key, value] of Object.entries(constraints)) {
      // For oneOfClass, keep the original message format
      if (key === 'oneOfClass') {
        formatted.push(value);
      } else {
        formatted.push(defaultMessages[key] || value);
      }
    }

    return formatted;
  }
}
