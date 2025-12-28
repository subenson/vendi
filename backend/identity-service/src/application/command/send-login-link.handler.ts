import { CommandHandler } from '@nestjs/cqrs';
import { SendLoginLinkCommand } from './send-login-link.command';

@CommandHandler(SendLoginLinkCommand)
export class SendLoginLinkHandler {
  async execute(command: SendLoginLinkCommand) {
    console.log(
      `Sending login link to ${command.email} with redirect URL: ${command.redirectUrl}`,
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Login link sent to ${command.email}`);
  }
}
