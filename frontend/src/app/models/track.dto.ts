import {CommentDto} from './comment.dto';

export interface  TrackDto {
  id_track: number,
  track_name: string,
  version: number,
  file_url: string,
  uploaded_at: Date,
  project_id: number,
  uploader_id: number,
  parent_track_id: number | null,
  child_versions: TrackDto[] | null,
  comments: CommentDto[] | null;
}
