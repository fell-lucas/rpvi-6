import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsSignInDto {
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsString()
  password: string;
}
