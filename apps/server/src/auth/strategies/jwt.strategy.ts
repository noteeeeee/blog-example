import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EnvConfig } from '@app/config';
import { UsersService } from 'src/users/users.service';
import { JWTPayload } from '../types/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: EnvConfig.JWT_SECRET,
    });
  }

  async validate({ sub }: JWTPayload) {
    const user = await this.usersService.findByUUID(sub)
    return user || false;
  }
}