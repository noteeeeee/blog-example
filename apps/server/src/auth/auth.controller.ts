import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthUserDto, LoginDto, RegisterDto } from './dto';
import { Public } from './decorators';
import { AuthService } from './auth.service';
import { CurrentUser, User, UserDto } from 'src/users';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthUserDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: AuthUserDto })
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse()
  me(@CurrentUser() user: User) {
    return new UserDto(user);
  }
}
