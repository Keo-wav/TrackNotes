import { ApiProperty } from '@nestjs/swagger';

export class EditTrackDto {
  @ApiProperty({ example: 'Bass Demo v2 - Final Mix', required: false })
  track_name?: string;

  @ApiProperty({ example: 1.05, required: false })
  version?: number;

  @ApiProperty({ example: 'https://storage.url/new-file.mp3', required: false })
  file_url?: string;
}
