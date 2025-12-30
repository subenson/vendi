import { CommandHandler } from '@nestjs/cqrs';
import { SendLoginLinkCommand } from './send-login-link.command';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user.model';
import { PrefixedUlid } from '@vendi/core';
import * as crypto from 'crypto';

@CommandHandler(SendLoginLinkCommand)
export class SendLoginLinkHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: SendLoginLinkCommand) {
    let user: User | null;

    user = await this.userRepository.findOneBy({ email: command.email });

    if (!user) {
      user = User.create(PrefixedUlid.create(User.prefix), command.email);
    }

    const loginToken = crypto
      .randomBytes(Math.ceil(32 / 2))
      .toString('hex')
      .slice(0, 32);

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    user.setLoginToken(loginToken, expiresAt);

    await this.userRepository.save(user);

    console.log(`Sending login link to: ${user.email}`);
    console.log(`Token: ${loginToken}`);
  }
}
