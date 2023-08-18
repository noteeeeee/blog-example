import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { Comment } from '../comment.entity';
import { UserDto } from 'src/users';

@Exclude()
export class CommentRequestDto implements Partial<Comment> {
  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsUUID()
  article_id: string
}

@Exclude()
export class CommentResponseDto implements Partial<Comment> {
  @Expose()
  content: string;

  @Expose()
  @Type(() => UserDto)
  author?: UserDto;

  @Expose()
  created: string;

  @Expose()
  updated: string;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
