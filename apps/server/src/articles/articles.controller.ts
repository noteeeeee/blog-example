import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleRequestDto, ArticleResponseDto } from './dto';
import { CurrentUser, User } from 'src/users';
import { Public } from 'src/auth';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Public()
  @Get()
  async find(@Paginate() query: PaginateQuery) {
    return this.articlesService.find(query)
  }

  @Post()
  create(@CurrentUser() user: User, @Body() body: ArticleRequestDto) {
    return this.articlesService.create(user, body)
  }

  @Public()
  @Get(":uuid")
  async findOne(@Param("uuid") uuid: string) {
    const article = await this.articlesService.findByUUID(uuid)
    if (!article) throw new NotFoundException()

    return new ArticleResponseDto(article)
  }
}
