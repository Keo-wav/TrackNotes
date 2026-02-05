import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Neon Nights' })
  name: string;

  @ApiProperty({
    example: 'The 80s inspired EP',
    required: false,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who owns this project',
  })
  creator: number;
}
