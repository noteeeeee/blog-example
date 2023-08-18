import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleRequestDto, ArticleResponseDto } from './dto';
import { CurrentUser, User } from 'src/users';
import { Public } from 'src/auth';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

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
