import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { CreateCommentDto } from '../dto/comment-create.dto';
import { EditCommentDto } from '../dto/comment-edit.dto';
import { User } from '../../users/entities/user.entity';
import { Track } from '../../tracks/entity/track.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    const newComment = this.commentRepository.create({
      content: dto.content,
      timestamp: dto.timestamp ?? undefined,
      author: { id_user: dto.author_id } as User,
      track: { id_track: dto.track_id } as Track,
      parent: dto.parent_id
        ? ({ id_comment: dto.parent_id } as Comment)
        : undefined,
    });

    return this.commentRepository.save(newComment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: ['author', 'replies', 'replies.author'],
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment: Comment | null = await this.commentRepository.findOne({
      where: { id_comment: id } as Comment,
      relations: ['author', 'track', 'replies', 'parent'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: number, dto: EditCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    this.commentRepository.merge(comment, dto);
    return this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);
  }
}
