import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Public } from "src/auth";
import { CurrentUser, User } from "src/users";
import { CommentRequestDto } from "./dto";

@Controller("comment")
export class CommentsController {
  constructor (private readonly commentsService: CommentsService) {}

  @Public()
  @Get("article/:article_uuid")
  findByArticleUUID(@Param("article_uuid") uuid: string) {
    return this.commentsService.findByArticleUUID(uuid)
  }

  @Post()
  create(@CurrentUser() user: User, @Body() body: CommentRequestDto) {
    return this.commentsService.create(user, body)
  }
}