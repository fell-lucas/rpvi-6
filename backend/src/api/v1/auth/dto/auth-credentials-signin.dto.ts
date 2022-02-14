import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class AuthCredentialsSignInDto {
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsString()
  password: string;
}
