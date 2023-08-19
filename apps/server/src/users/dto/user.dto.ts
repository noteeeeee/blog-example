import { Exclude, Expose } from 'class-transformer';
import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserDto implements Partial<User> {
  @Expose()
  @ApiProperty()
  uuid: string;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty({ required: false })
  isAdmin: boolean;

  @Expose()
  @ApiProperty()
  created: Date;

  @Expose()
  @ApiProperty()
  updated: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
