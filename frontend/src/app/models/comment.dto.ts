export interface CommentDto {
  id_comment: number,
  content: string,
  timestamp: number | null,
  created_at: Date,
  parent_id: number,
  author_id: number,
  author_name: string,
  author_avatar: string | null,
  track_id: number | null,
  project_id: number,
  replies: CommentDto[] | null
}
