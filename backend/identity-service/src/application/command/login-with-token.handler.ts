import { CommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user.model';
import { LoginWithTokenCommand } from './login-with-token.command';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@CommandHandler(LoginWithTokenCommand)
export class LoginWithTokenHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginWithTokenCommand) {
    const user = await this.userRepository.findOneBy({ email: command.email });

    if (!user) {
      throw new BadRequestException();
    }

    if (!user.loginTokenIsValid(command.token)) {
      throw new BadRequestException();
    }

    user.resetLoginRequest();

    // Generate refresh token (128 chars total)
    const refreshToken = randomBytes(64).toString('hex');
    const tokenId = refreshToken.substring(0, 32);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

    user.setRefreshToken(tokenId, refreshTokenHash, refreshTokenExpiresAt);
    user.setLastLogin();
    await this.userRepository.save(user);

    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        email: user.email,
        tenants: [],
        current_tenant: null,
      }),
      refreshToken,
    };
  }
}
