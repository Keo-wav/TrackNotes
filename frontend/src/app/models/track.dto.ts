import {CommentDto} from './comment.dto';

export interface TrackDto {
  id_track: number,
  track_name: string,
  version: number,
  file_url: string,
  duration: number | null;
  uploaded_at: Date,
  project_id: number,
  uploader_id: number,
  parent_track_id: number | null,
  child_versions: TrackDto[] | null,
  comments: CommentDto[] | null;
  commentCount: number;
}

export interface CreateTrackDto {
  track_name: string,
  version: number,
  file_url: string,
  project_id: number,
  parent_track_id: number | null,
  commentCount: number;
}
