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
import { Comment } from '../entity/comment.entity';
import { CommentService } from '../service/comment.service';
import { CreateCommentDto } from '../dto/comment-create.dto';
import { EditCommentDto } from '../dto/comment-edit.dto';
import { CommentDto } from '../dto/comment.dto';
import { CommentMapper } from '../mappers/comment.mapper';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment or reply' })
  @ApiResponse({
    status: 201,
    description: 'Comment created successfully',
    type: CommentDto,
  })
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDto> {
    return CommentMapper.mapCommentEntityToDto(
      await this.commentService.create(createCommentDto),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments across all tracks' })
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get('track/:id')
  @ApiOperation({ summary: 'Get all comments for one track' })
  @ApiResponse({
    status: 200,
    description: 'Comments found',
    type: CommentDto,
    isArray: true,
  })
  async findByTrack(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentDto[]> {
    return CommentMapper.mapCommentEntitiesToDtos(
      await this.commentService.findByTrack(id),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by its ID' })
  @ApiResponse({ status: 200, type: CommentDto })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CommentDto> {
    return CommentMapper.mapCommentEntityToDto(
      await this.commentService.findOne(id),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update comment content' })
  @ApiResponse({
    status: 201,
    description: 'Comment updated successfully',
    type: CommentDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editCommentDto: EditCommentDto,
  ): Promise<CommentDto> {
    return CommentMapper.mapCommentEntityToDto(
      await this.commentService.update(id, editCommentDto),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commentService.remove(id);
  }
}
