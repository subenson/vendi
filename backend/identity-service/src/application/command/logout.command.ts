import { Command } from '@nestjs/cqrs';

export class LogoutCommand extends Command<void> {
  constructor(public readonly userId: string) {
    super();
  }
}
