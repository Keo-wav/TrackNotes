import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'Bass Demo v2' })
  track_name: string;

  @ApiProperty({ example: 1.02, required: false })
  version?: number;

  @ApiProperty({ example: 'https://storage.url/file.mp3' })
  file_url: string;

  @ApiProperty({ example: 3, description: 'The project this track belongs to' })
  project_id: number;

  @ApiProperty({ example: 1, description: 'The user who uploaded this' })
  uploader_id: number;

  @ApiProperty({
    example: 10,
    required: false,
    nullable: true,
    description: 'ID of the previous version',
  })
  parent_track_id?: number | null;
}
