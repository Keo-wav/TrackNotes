import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @ApiProperty({ example: 11 })
  id_project: number;

  @ApiProperty({ example: 'Neon Nights' })
  name: string;

  @ApiProperty({
    example: 'The 80s inspired EP',
    required: false,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    example: 'https://cover-art.url/img.jpg',
    required: false,
    nullable: true,
  })
  picture?: string | null;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who owns this project',
  })
  creator_id: number;
}
