import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { UserWithCommentsDto } from '../dto/user-with-comments.dto';
import { CommentMapper } from '../../comments/mappers/comment.mapper';

export class UserMapper {
  static mapUserEntityToDto(user: User): UserDto {
    return {
      id_user: user.id_user,
      username: user.username,
      band_role: user.band_role ?? null,
      isAdmin: user.isAdmin,
      profile_picture: user.profile_picture ?? null,
      commentCount: user.commentCount ?? user.comments?.length ?? 0,
    };
  }

  static mapUserEntityToDtoWithComments(user: User): UserWithCommentsDto {
    return {
      ...this.mapUserEntityToDto(user),
      comments: user.comments
        ? CommentMapper.mapCommentEntitiesToDtos(user.comments)
        : [],
    };
  }

  static mapUserEntitiesToDtos(users: User[]): UserDto[] {
    return users.map((user) => this.mapUserEntityToDto(user));
  }
}
