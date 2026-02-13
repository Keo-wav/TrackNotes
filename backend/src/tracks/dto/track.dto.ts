import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '../../comments/entity/comment.entity';

export class TrackDto {
  @ApiProperty({ example: 1 })
  id_track: number;

  @ApiProperty({ example: 'les pigeons de la mort pt.2' })
  track_name: string;

  @ApiProperty({ example: 1.02 })
  version: number;

  @ApiProperty({ example: 'https://storage.url/file.mp3' })
  file_url: string;
  duration: number | null;

  @ApiProperty({ example: '2026-02-06T12:00:00Z' })
  uploaded_at: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the project this track belongs to',
  })
  project_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the user who uploaded the track',
  })
  uploader_id: number;

  @ApiProperty({
    example: 2,
    nullable: true,
    description: 'ID of the parent track if this is a new version',
  })
  parent_track_id: number | null;

  @ApiProperty({
    type: () => TrackDto,
    isArray: true,
    required: false,
    description: 'List of subsequent versions of this track',
  })
  // Only include children if specifically requested to avoid huge payloads
  child_versions?: TrackDto[];

  @ApiProperty({
    type: () => Comment,
    isArray: true,
    required: false,
    description: 'List of comments on this track',
  })
  comments?: Comment[];

  commentCount: number;
}
