import { Exclude, Expose, Type, instanceToPlain } from 'class-transformer';
import { UserDto } from 'src/users';
import { Article } from '../article.entity';
import { IsString } from 'class-validator';
import { PaginatedDto } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';
import { Paginated } from 'nestjs-paginate';

@Exclude()
export class ArticleRequestDto implements Partial<Article> {
  @ApiProperty()
  @Expose()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsString()
  shortContent: string;

  @ApiProperty()
  @Expose()
  @IsString()
  content: string;
}

@Exclude()
export class ArticleResponseDto {
  @ApiProperty()
  @Expose()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsString()
  shortContent: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @Type(() => UserDto)
  @ApiProperty({ type: UserDto })
  author?: UserDto;

  @Expose()
  @ApiProperty()
  created: string;

  @Expose()
  @ApiProperty()
  updated: string;

  constructor(partial: Partial<Article>) {
    Object.assign(this, partial);
  }
}

export class ArticlesPaginatedDto extends PaginatedDto<Article> {
  @ApiProperty({ isArray: true, type: ArticleResponseDto })
  data: ArticleResponseDto[];

  constructor(partial: Paginated<Article>) {
    super(partial)
    Object.assign(this, partial);
    this.data = this.data?.map(item => instanceToPlain(new ArticleResponseDto(item as any)) as ArticleResponseDto) || []
  }
}
