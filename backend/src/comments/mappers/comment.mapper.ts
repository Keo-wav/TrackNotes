import { CommentDto } from '../dto/comment.dto';
import { Comment } from '../entity/comment.entity';
import { User } from '../../users/entities/user.entity';

export class CommentMapper {
  static mapCommentEntityToDto(comment: Comment): CommentDto {
    return {
      id_comment: comment.id_comment,
      content: comment.content,
      timestamp: comment.timestamp,
      created_at: comment.created_at,
      author: {
        id_user: comment.author.id_user,
        username: comment.author.username,
      } as User,
      track_id: comment.track.id_track,
      replies: comment.replies
        ? comment.replies.map((reply) => this.mapCommentEntityToDto(reply))
        : [],
    };
  }

  static mapCommentEntitiesToDtos(comments: Comment[]): CommentDto[] {
    return comments.map((comment) => {
      return this.mapCommentEntityToDto(comment);
    });
  }
}
