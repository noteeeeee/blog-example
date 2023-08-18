import { Module } from '@nestjs/common';
import ormconfig from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig.options), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
