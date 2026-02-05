import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'infinite_potato' })
  username: string;

  @ApiProperty({ example: 'drummer boi', nullable: true })
  band_role?: string | null;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({
    required: false,
    example: 'https://avatar.url/me.png',
    nullable: true,
  })
  profile_picture?: string | null;
}
