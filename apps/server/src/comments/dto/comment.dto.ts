import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { Comment } from '../comment.entity';
import { UserDto } from 'src/users';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CommentRequestDto implements Partial<Comment> {
  @ApiProperty()
  @Expose()
  @IsString()
  content: string;

  @ApiProperty()
  @Expose()
  @IsUUID()
  article_id: string
}

@Exclude()
export class CommentResponseDto implements Partial<Comment> {
  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty({ type: UserDto })
  @Expose()
  @Type(() => UserDto)
  author?: UserDto;

  @ApiProperty()
  @Expose()
  created: string;

  @ApiProperty()
  @Expose()
  updated: string;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
