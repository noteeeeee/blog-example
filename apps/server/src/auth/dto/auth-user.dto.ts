import { User } from 'src/users';
import { UserDto } from 'src/users';

export class AuthUserDto {
  user: UserDto;

  accessToken: string;

  constructor(user: Partial<User>, accessToken: string) {
    this.user = new UserDto(user);
    this.accessToken = accessToken;
  }
}
