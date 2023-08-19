import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';
import { ArticleRequestDto, ArticleResponseDto } from './dto';
import { User } from 'src/users';
import { instanceToPlain } from 'class-transformer';

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

    paginated.data = paginated.data.map((item) =>
      instanceToPlain(new ArticleResponseDto(item)) as any,
    );

    return paginated
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
      comment: body.content,
    });

    return new ArticleResponseDto(article);
  }
}
