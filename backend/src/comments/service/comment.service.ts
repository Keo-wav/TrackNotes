import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/comment-create.dto';
import { Project } from '../../projects/entity/project.entity';
import { User } from '../../users/entities/user.entity';
import { Track } from '../../tracks/entity/track.entity';
import { Comment } from '../entity/comment.entity';
import { EditCommentDto } from '../dto/comment-edit.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  /**
   * Internal helper to ensure we always get a full entity or a 404
   */
  async findOneOrThrow(
    id: number,
    relations: string[] = ['author', 'track', 'project', 'parent'],
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id_comment: id },
      relations,
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async create(dto: CreateCommentDto): Promise<Comment> {
    // 1. Initialize entity with basic info
    const comment = this.commentRepository.create({
      content: dto.content,
      project: { id_project: dto.project_id } as Project,
      author: { id_user: dto.author_id } as User,
      timestamp: dto.timestamp ?? null,
    });

    // 2. Handle Track Assignment
    if (dto.track_id) {
      comment.track = { id_track: dto.track_id } as Track;
    }

    // 3. Handle Thread Inheritance
    if (dto.parent_id) {
      const parent = await this.commentRepository.findOne({
        where: { id_comment: dto.parent_id },
        relations: ['track'],
      });

      if (!parent) {
        throw new BadRequestException(
          `Parent comment ${dto.parent_id} does not exist`,
        );
      }

      comment.parent = parent;
      // Replies MUST live where their parent lives
      comment.track = parent.track;
      comment.timestamp = parent.timestamp;
    }

    const savedComment = await this.commentRepository.save(comment);

    // 4. Re-fetch to ensure the Mapper has 'author.username' and other relations
    // This prevents the "jank" of returning a DTO with missing names/avatars
    return this.findOneOrThrow(savedComment.id_comment);
  }

  async findByTrack(trackId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { track: { id_track: trackId } },
      relations: ['author', 'parent'], // 'parent' is needed to identify top-level pins
      order: { created_at: 'ASC' },
    });
  }

  async update(id: number, dto: EditCommentDto): Promise<Comment> {
    const comment = await this.findOneOrThrow(id);

    // We only allow content updates to maintain thread integrity
    this.commentRepository.merge(comment, { content: dto.content });

    return this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOneOrThrow(id);
    await this.commentRepository.remove(comment);
  }
}
