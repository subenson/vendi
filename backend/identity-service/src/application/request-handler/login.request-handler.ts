import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';

@Controller('login')
export class LoginRequestHandler {
  @Post()
  login(@Body() loginDto: LoginDto) {
    console.log('Login attempt for email:', loginDto.email);
    return {
      message: 'Login request received.',
      email: loginDto.email,
    };
  }
}
