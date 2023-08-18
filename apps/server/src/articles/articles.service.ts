import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleRequestDto, ArticleResponseDto } from './dto';
import { User } from 'src/users';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepo: Repository<Article>,
  ) {}

  async findByUUID(uuid: string) {
    return this.articlesRepo.findOne({
      where: { uuid },
      relations: ['author'],
    });
  }

  async create(author: User, body: ArticleRequestDto) {
    const article = await this.articlesRepo.save({
        author: { uuid: author.uuid },
        comment: body.content
    })

    return new ArticleResponseDto(article)
  }
}
