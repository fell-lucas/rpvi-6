/* istanbul ignore file */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsSignInDto } from './dto/auth-credentials-signin.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsSignInDto: AuthCredentialsSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsSignInDto);
  }

  @Get('/active')
  @UseGuards(AuthGuard('jwt'))
  active(@GetUser() user: User): User {
    user.password = undefined;
    return user;
  }

  @Get('/orientadores/:id')
  @UseGuards(AuthGuard('jwt'))
  async orientadores(@Param('id') id: string): Promise<User[]> {
    return await this.authService.findAll(id);
  }
}
