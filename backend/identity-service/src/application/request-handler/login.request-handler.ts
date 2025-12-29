import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { CommandBus } from '@nestjs/cqrs';
import { SendLoginLinkCommand } from '../command/send-login-link.command';

@Controller('login')
export class LoginRequestHandler {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    await this.commandBus.execute(
      new SendLoginLinkCommand(loginDto.email, loginDto.redirectUrl),
    );
  }
}
