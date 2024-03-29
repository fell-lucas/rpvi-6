/* istanbul ignore file */
import {
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Campus } from '../../campuses/entities/campus.entity';
import { UserRole } from '../user-role.enum';

export class AuthCredentialsDto {
  @IsString()
  name: string;

  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsObject()
  campus: Campus;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @IsOptional()
  @MinLength(10, { message: 'Matricula deve ter exatamente 10 caracteres' })
  @MaxLength(10, { message: 'Matricula deve ter exatamente 10 caracteres' })
  matricula?: string;
}
