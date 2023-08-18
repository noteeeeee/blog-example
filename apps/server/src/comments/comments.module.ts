import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { CommentsController } from "./comments.controller";
import { ArticlesModule } from "src/articles/articles.module";

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ArticlesModule],
  providers: [CommentsService],
  exports: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}