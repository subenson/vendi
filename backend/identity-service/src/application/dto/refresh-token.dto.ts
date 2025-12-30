import { IsString, Length } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @Length(128, 128)
  refreshToken: string;
}
