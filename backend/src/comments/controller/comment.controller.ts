import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentService } from '../service/comment.service';
import { CreateCommentDto } from '../dto/comment-create.dto';
import { EditCommentDto } from '../dto/comment-edit.dto';
import { Comment } from '../entity/comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment or reply' })
  @ApiResponse({
    status: 201,
    description: 'Comment created successfully.',
    type: Comment,
  })
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by its ID' })
  @ApiResponse({ status: 200, type: Comment })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  getById(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update comment content' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editCommentDto: EditCommentDto,
  ): Promise<Comment> {
    return this.commentService.update(id, editCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commentService.remove(id);
  }
}
