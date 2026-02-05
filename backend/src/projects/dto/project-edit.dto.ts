import { ApiProperty } from '@nestjs/swagger';

export class EditProjectDto {
  @ApiProperty({
    example: 'Neon Nights',
    nullable: true,
  })
  name?: string;

  @ApiProperty({
    example: 'The 80s inspired EP',
    required: false,
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    example: 'https://cover-art.url/img.jpg',
    required: false,
    nullable: true,
  })
  picture?: string;
}
