import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  create(user: DeepPartial<User>) {
    return this.usersRepo.save(user);
  }

  findByUUID(uuid: string) {
    return this.usersRepo.findOneBy({ uuid });
  }

  findByUsername(username: string) {
    return this.usersRepo.findOneBy({ username });
  }

  updateByUUID(uuid: string, partial: DeepPartial<User>) {
    return this.usersRepo.update({ uuid }, partial);
  }
}
