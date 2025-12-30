import { Command } from '@nestjs/cqrs';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

export class RefreshTokenCommand extends Command<{
  accessToken: string;
  refreshToken: string;
}> {
  refreshToken: string;

  constructor(public readonly dto: RefreshTokenDto) {
    super();
    this.refreshToken = dto.refreshToken;
  }
}
