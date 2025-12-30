import { CommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user.model';
import { RefreshTokenCommand } from './refresh-token.command';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RefreshTokenCommand) {
    const refreshTokenId = command.refreshToken.substring(0, 32);
    const user = await this.userRepository.findOneBy({ refreshTokenId });

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (user.isRefreshTokenExpired()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const isValid = await bcrypt.compare(
      command.refreshToken,
      user.refreshTokenHash,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generate new refresh token
    const refreshToken = randomBytes(64).toString('hex');
    const tokenId = refreshToken.substring(0, 32);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

    user.setRefreshToken(tokenId, refreshTokenHash, refreshTokenExpiresAt);
    await this.userRepository.save(user);

    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        email: user.email,
        tenants: [],
        current_tenant: null,
      }),
      refreshToken: refreshToken,
    };
  }
}
