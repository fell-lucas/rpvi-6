/* istanbul ignore file */
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-role.enum';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { name, email, password, campus, role, matricula } =
      authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role == UserRole.ALUNO && matricula == undefined) {
      throw new BadRequestException([
        'Usuário aluno deve ter uma matricula válida',
      ]);
    }

    const user = this.create({
      name,
      email,
      password: hashedPassword,
      campus,
      role,
      matricula,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505' || error.code === 'ER_DUP_ENTRY') {
        // duplicate email
        throw new ConflictException('Email ou matricula já existem');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
