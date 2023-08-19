import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users';
import { CommentRequestDto, CommentResponseDto } from './dto';
import { instanceToPlain } from 'class-transformer';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class CommentsService {
  constructor(
    private articlesService: ArticlesService,
    @InjectRepository(Comment)
    private readonly commentsRepo: Repository<Comment>,
  ) {}

  async create(author: User, body: CommentRequestDto) {
    const article = await this.articlesService.findByUUID(body.article_id);
    if (!article) throw new NotFoundException();

    const comment = await this.commentsRepo.save({
      author: { uuid: author.uuid },
      article: { uuid: article.uuid },
      content: body.content,
    });
    return new CommentResponseDto(comment);
  }

  async findByArticleUUID(uuid: string) {
    const comments = await this.commentsRepo.find({
      where: {
        article: { uuid },
      },
      order: {
        created: "DESC"
      },
      relations: ['author'],
    });

    return comments.map((comment) =>
      instanceToPlain(new CommentResponseDto(comment)),
    );
  }
}
