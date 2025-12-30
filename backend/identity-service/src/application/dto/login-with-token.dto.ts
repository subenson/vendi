import { IsEmail, IsString } from 'class-validator';

export class LoginWithTokenDto {
  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
