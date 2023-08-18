import { Exclude, Expose } from 'class-transformer';
import { User } from '../user.entity';

@Exclude()
export class UserDto implements Partial<User> {
  @Expose()
  uuid: string;

  @Expose()
  username: string;

  @Expose()
  isAdmin: string;

  @Expose()
  password: string;

  @Expose()
  created: Date;

  @Expose()
  updated: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
