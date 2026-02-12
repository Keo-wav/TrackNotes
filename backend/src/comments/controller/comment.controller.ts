import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CommentDto } from '../dto/comment.dto';
import { CreateCommentDto } from '../dto/comment-create.dto';
import { CommentMapper } from '../mappers/comment.mapper';
import { EditCommentDto } from '../dto/comment-edit.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment or reply' })
  @ApiResponse({ status: 201, type: CommentDto })
  async create(@Body() dto: CreateCommentDto): Promise<CommentDto> {
    const entity = await this.commentService.create(dto);
    return CommentMapper.mapCommentEntityToDto(entity);
  }

  @Get('track/:id')
  @ApiOperation({ summary: 'Get all comments for a specific track' })
  async findByTrack(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentDto[]> {
    const entities = await this.commentService.findByTrack(id);
    return CommentMapper.mapCommentEntitiesToDtos(entities);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update comment text' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditCommentDto,
  ): Promise<CommentDto> {
    const entity = await this.commentService.update(id, dto);
    return CommentMapper.mapCommentEntityToDto(entity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a comment and its replies' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commentService.remove(id);
  }
}
