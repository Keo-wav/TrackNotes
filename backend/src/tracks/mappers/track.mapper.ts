import { Track } from '../entity/track.entity';
import { TrackDto } from '../dto/track.dto';

export class TrackMapper {
  static mapTrackEntityToDto(track: Track): TrackDto {
    return {
      id_track: track.id_track,
      track_name: track.track_name,
      version: track.version,
      file_url: track.file_url,
      duration: track.duration,
      uploaded_at: track.uploaded_at.toISOString(),
      project_id: track.project?.id_project,
      uploader_id: track.uploader?.id_user,
      parent_track_id: track.parent_track?.id_track ?? null,
      commentCount: track.commentCount ?? track.comments?.length ?? 0,

      child_versions: track.child_versions
        ? track.child_versions.map((child) => this.mapTrackEntityToDto(child))
        : [],
    };
  }

  static mapTrackEntitiesToDtos(tracks: Track[]): TrackDto[] {
    return tracks.map((t) => this.mapTrackEntityToDto(t));
  }
}
