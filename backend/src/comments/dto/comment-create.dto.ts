import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Why is this synth still alive LMAO call 911' })
  content: string;

  @ApiProperty({ example: 67 })
  project_id: number;

  @ApiProperty({ example: 69 })
  author_id: number;

  // Si ces 2 trucs sont là c'est que le commentaire 'initie' un thread
  @ApiProperty({ example: 12, nullable: true })
  track_id?: number | null;

  @ApiProperty({ example: 126, nullable: true })
  timestamp?: number | null;

  // si parent_id existe, le commentaire est une réponse dans un thread
  @ApiProperty({ example: 4, nullable: true })
  parent_id?: number | null;
}
