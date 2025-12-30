import { ulid as generateUlid } from 'ulid';

export class PrefixedUlid {
  static create(prefix: string): string {
    if (!prefix || typeof prefix !== 'string' || prefix.length !== 3) {
      throw new Error('Prefix must be a 3 character string');
    }
    return `${prefix.toLowerCase()}_${generateUlid()}`;
  }

  static from(value: string): string {
    if (!value || typeof value !== 'string') {
      throw new Error('Value must be a non-empty string');
    }
    return value;
  }
}
