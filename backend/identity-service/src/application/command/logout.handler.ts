import { CommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user.model';
import { LogoutCommand } from './logout.command';

@CommandHandler(LogoutCommand)
export class LogoutHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: LogoutCommand): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: command.userId });

    if (user) {
      user.clearRefreshToken();
      await this.userRepository.save(user);
    }
  }
}
