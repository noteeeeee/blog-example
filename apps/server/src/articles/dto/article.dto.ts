import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users';
import { Article } from '../article.entity';
import { IsString } from 'class-validator';

@Exclude()
export class ArticleRequestDto implements Partial<Article> {
  @Expose()
  @IsString()
  content: string;
}

@Exclude()
export class ArticleResponseDto {
  @Expose()
  content: string;

  @Expose()
  @Type(() => UserDto)
  author?: UserDto;

  @Expose()
  created: string;

  @Expose()
  updated: string;

  constructor(partial: Partial<Article>) {
    Object.assign(this, partial);
  }
}
