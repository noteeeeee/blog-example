import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthUserDto, LoginDto, RegisterDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { JWTPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const user = await this.usersService.findByUsername(body.username);
    if (!user) throw new NotFoundException();

    if (bcrypt.compareSync(body.password, body.password))
      throw new NotFoundException();

    const accessToken = this.jwtService.sign({ uuid: user.uuid } as JWTPayload);
    return instanceToPlain(new AuthUserDto(user, accessToken));
  }

  async register(body: RegisterDto) {
    if (await this.usersService.findByUsername(body.username))
      throw new ConflictException();

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await this.usersService.create({
      username: body.username,
      password: passwordHash,
    });
    const accessToken = this.jwtService.sign({ uuid: user.uuid } as JWTPayload);

    return instanceToPlain(new AuthUserDto(user, accessToken));
  }
}
