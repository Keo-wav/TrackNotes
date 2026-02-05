import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty({
    required: false,
    example: 'infinite_potato',
    nullable: false,
  })
  username?: string;

  @ApiProperty({
    required: false,
    example: 'drummer boi',
    nullable: true,
  })
  band_role?: string | null;

  @ApiProperty({
    required: false,
    example: 'password123',
    nullable: false,
  })
  password?: string;

  @ApiProperty({
    required: false,
    example: 'https://avatar.url/me.png',
    nullable: true,
  })
  profile_picture?: string | null;
}
