import { Command } from '@nestjs/cqrs';
import { LoginRequestDto } from '../dto/login-request.dto';

export class SendLoginLinkCommand extends Command<void> {
  email: string;
  redirectUrl: string;

  constructor(public readonly dto: LoginRequestDto) {
    super();
    this.email = dto.email;
    this.redirectUrl = dto.redirectUrl;
  }
}
