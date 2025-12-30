import { LoginWithTokenDto } from '../dto/login-with-token.dto';
import { Command } from '@nestjs/cqrs';

export class LoginWithTokenCommand extends Command<{ accessToken: string }> {
  email: string;
  token: string;

  constructor(public readonly dto: LoginWithTokenDto) {
    super();
    this.email = dto.email;
    this.token = dto.token;
  }
}
