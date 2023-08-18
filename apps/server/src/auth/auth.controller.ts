import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { Public } from './decorators';
import { AuthService } from './auth.service';
import { CurrentUser, User, UserDto } from 'src/users';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Get('me')
  me(@CurrentUser() user: User) {
    return new UserDto(user);
  }
}
