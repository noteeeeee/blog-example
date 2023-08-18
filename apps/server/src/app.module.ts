import { Module } from '@nestjs/common';
import ormconfig from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig.options),
    AuthModule,
    UsersModule,
    ArticlesModule,
    CommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
