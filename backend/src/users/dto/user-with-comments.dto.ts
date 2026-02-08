import { UserDto } from './user.dto';
import { CommentDto } from '../../comments/dto/comment.dto';

export class UserWithCommentsDto extends UserDto {
  comments: CommentDto[];
}
