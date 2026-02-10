import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserWithCommentsDto } from '../dto/user-with-comments.dto';
import { CommentMapper } from '../../comments/mappers/comment.mapper';

export class UserMapper {
  static mapUserEntityToDto(user: User): UserDto {
    return {
      id_user: user.id_user,
      username: user.username,
      band_role: user.band_role ?? null,
      password: user.password,
      isAdmin: user.isAdmin,
      profile_picture: user.profile_picture,
    };
  }

  static mapUserEntityToDtoWithComments(user: User): UserWithCommentsDto {
    return {
      id_user: user.id_user,
      username: user.username,
      band_role: user.band_role ?? null,
      password: user.password,
      isAdmin: user.isAdmin,
      profile_picture: user.profile_picture,
      comments: CommentMapper.mapCommentEntitiesToDtos(user.comments),
    };
  }

  static mapUserEntitiesToDtos(users: User[]): UserDto[] {
    return users.map((user) => {
      return this.mapUserEntityToDto(user);
    });
  }
}
