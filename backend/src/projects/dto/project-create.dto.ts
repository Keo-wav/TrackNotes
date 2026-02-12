import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Neon Nights' })
  name: string;

  @ApiProperty({
    example: 'The 80s inspired EP',
    required: false,
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    example: 'https://nicolas-cage-wallpaper.jpg',
    description: 'Path to the project picture, if any',
  })
  picture?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who owns this project',
  })
  creator_id: number;
}
