/* istanbul ignore file */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsSignInDto } from './dto/auth-credentials-signin.dto';
import { UserRole } from './user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsSignInDto: AuthCredentialsSignInDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsSignInDto;
    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async findAll(id: string) {
    let found = await this.usersRepository.find({
      where: { role: UserRole.ORIENTADOR, campus: id },
      order: { name: 'ASC' },
    });
    found.map((user) => {
      user.password = undefined;
    });
    return found;
  }
}
