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

  @ApiProperty({ description: 'The user who wrote this' })
  author: { id_user: number; username: string };

  @ApiProperty({ example: 10, description: 'The track ID' })
  track_id: number;

  @ApiProperty({
    type: () => CommentDto,
    isArray: true,
    description: 'Replies to this comment',
  })
  replies: CommentDto[];
}
