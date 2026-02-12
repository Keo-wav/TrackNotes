import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ example: 501 })
  id_comment: number;

  @ApiProperty({ example: 'Why is this synth still alive LMAO call 911' })
  content: string;

  @ApiProperty({ example: 42, nullable: true })
  timestamp: number | null;

  @ApiProperty({ example: '2026-02-06T01:00:00Z' })
  created_at: Date;

  @ApiProperty({ example: 49 })
  parent_id: number | null;

  @ApiProperty({ example: 24 })
  author_id: number;

  @ApiProperty({ example: 'branlix2000' })
  author_name: string;

  @ApiProperty({ example: 'https://avatar.url/me.png' })
  author_avatar: string | null;

  @ApiProperty({ example: 42 })
  track_id: number | null;

  @ApiProperty({ example: 16 })
  project_id: number;

  @ApiProperty({ example: 12 })
  reply_count: number;
}
