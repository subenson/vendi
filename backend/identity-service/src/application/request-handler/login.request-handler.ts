import {
  Controller,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { LoginRequestDto } from '../dto/login-request.dto';
import { CommandBus } from '@nestjs/cqrs';
import { SendLoginLinkCommand } from '../command/send-login-link.command';
import { LoginWithTokenDto } from '../dto/login-with-token.dto';
import { LoginWithTokenCommand } from '../command/login-with-token.command';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RefreshTokenCommand } from '../command/refresh-token.command';
import { LogoutCommand } from '../command/logout.command';
import { JwtUserGuard } from '@vendi/core';

@Controller('login')
export class LoginRequestHandler {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async loginRequest(@Body() dto: LoginRequestDto) {
    await this.commandBus.execute(new SendLoginLinkCommand(dto));
  }

  @Put()
  async loginWithToken(@Body() dto: LoginWithTokenDto) {
    return await this.commandBus.execute(new LoginWithTokenCommand(dto));
  }

  @Put('refresh')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return await this.commandBus.execute(new RefreshTokenCommand(dto));
  }

  @Delete()
  @UseGuards(JwtUserGuard)
  async logout(@Request() req: { user: { sub: string } }) {
    await this.commandBus.execute(new LogoutCommand(req.user.sub));
  }
}
