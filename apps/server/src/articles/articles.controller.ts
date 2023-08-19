import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import {
  ArticleRequestDto,
  ArticleResponseDto,
  ArticlesPaginatedDto,
} from './dto';
import { CurrentUser, IsAdminGuard, User } from 'src/users';
import { Public } from 'src/auth';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PaginateQueryDto } from 'src/common';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Public()
  @Get()
  @ApiResponse({ type: ArticlesPaginatedDto })
  @ApiQuery({ type: PaginateQueryDto })
  async find(@Paginate() query: PaginateQuery) {
    return this.articlesService.find(query);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleResponseDto })
  @ApiBody({ type: ArticleRequestDto })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(IsAdminGuard)
  create(@CurrentUser() user: User, @Body() body: ArticleRequestDto) {
    return this.articlesService.create(user, body);
  }

  @Public()
  @Get(':uuid')
  @ApiOkResponse({ type: ArticleResponseDto })
  @ApiNotFoundResponse()
  async findOne(@Param('uuid') uuid: string) {
    const article = await this.articlesService.findByUUID(uuid);
    if (!article) throw new NotFoundException();

    return new ArticleResponseDto(article);
  }

  @Patch(':uuid')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleResponseDto })
  @ApiBody({ type: ArticleRequestDto })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(IsAdminGuard)
  update(@Param('uuid') uuid: string, @Body() body: ArticleRequestDto) {
    return this.articlesService.update(uuid, body);
  }

  @Delete(':uuid')
  @ApiBearerAuth()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(IsAdminGuard)
  delete(@Param('uuid') uuid: string) {
    return this.articlesService.delete(uuid);
  }
}
