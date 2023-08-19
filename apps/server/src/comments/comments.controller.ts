import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Public } from "src/auth";
import { CurrentUser, User } from "src/users";
import { CommentRequestDto, CommentResponseDto } from "./dto";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags('comment')
@Controller("comment")
export class CommentsController {
  constructor (private readonly commentsService: CommentsService) {}

  @Public()
  @ApiResponse({ type: CommentResponseDto, isArray: true })
  @Get("article/:article_uuid")
  findByArticleUUID(@Param("article_uuid") uuid: string) {
    return this.commentsService.findByArticleUUID(uuid)
  }

  @Post()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: CommentResponseDto })
  @ApiBody({ type: CommentRequestDto })
  @ApiUnauthorizedResponse()
  create(@CurrentUser() user: User, @Body() body: CommentRequestDto) {
    return this.commentsService.create(user, body)
  }
}