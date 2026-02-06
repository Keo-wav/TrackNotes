import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example:
      'I think the snare is shit at this part and that your whole personality sucks',
  })
  content: string;

  @ApiProperty({
    example: 42,
    description: 'Timestamp in seconds where the comment applies',
    required: false,
    nullable: true,
  })
  timestamp?: number | null;

  @ApiProperty({
    example: 1,
    description: 'ID of the user writing the comment',
  })
  author_id: number;

  @ApiProperty({
    example: 10,
    description: 'ID of the track being commented on',
  })
  track_id: number;

  @ApiProperty({
    example: null,
    description: 'ID of the parent comment if this is a reply',
    required: false,
    nullable: true,
  })
  parent_id?: number | null;
}
