import {UserDto} from './user/user.dto';

export interface CommentDto {
  id_comment: number,
  content: string,
  timestamp: number | null,
  created_at: Date,
  author: UserDto,
  track_id: number,
  replies: CommentDto[] | null
}
