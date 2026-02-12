import { CommentDto } from '../dto/comment.dto';
import { Comment } from '../entity/comment.entity';

export class CommentMapper {
  static mapCommentEntityToDto(comment: Comment): CommentDto {
    return {
      id_comment: comment.id_comment,
      content: comment.content,
      timestamp: comment.timestamp,
      created_at: comment.created_at,
      parent_id: comment.parent?.id_comment ?? null,

      author_id: comment.author?.id_user ?? 0,
      author_name: comment.author?.username ?? 'Unknown User',
      author_avatar: comment.author?.profile_picture ?? null,

      track_id: comment.track?.id_track ?? null,
      project_id: comment.project?.id_project ?? 0,

      reply_count: comment.replies?.length ?? 0,
    };
  }

  static mapCommentEntitiesToDtos(comments: Comment[]): CommentDto[] {
    return comments.map((comment) => {
      return this.mapCommentEntityToDto(comment);
    });
  }
}
