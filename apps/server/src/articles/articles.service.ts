import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';
import { ArticleRequestDto, ArticleResponseDto, ArticlesPaginatedDto } from './dto';
import { User } from 'src/users';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepo: Repository<Article>,
  ) {}

  async find(query: PaginateQuery) {
    const paginated = await paginate(query, this.articlesRepo, {
      sortableColumns: ['created'],
      defaultSortBy: [['created', 'DESC']],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        age: true,
      },
    });

    return new ArticlesPaginatedDto(paginated)
  }

  async findByUUID(uuid: string) {
    return this.articlesRepo.findOne({
      where: { uuid },
      relations: ['author'],
    });
  }

  async create(author: User, body: ArticleRequestDto) {
    const article = await this.articlesRepo.save({
      author: { uuid: author.uuid },
      content: body.content,
      title: body.title
    });

    return new ArticleResponseDto(article);
  }

  async delete(uuid: string) {
    await this.articlesRepo.delete({ uuid })
  }

  async update(uuid: string, body: ArticleRequestDto) {
    const article = await this.findByUUID(uuid)
    if (!article) throw new NotFoundException()
    await this.articlesRepo.update({ uuid }, body)
    return new ArticleResponseDto(Object.assign(article, body))
  }
}
