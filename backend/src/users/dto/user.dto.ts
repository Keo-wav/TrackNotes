import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 12 })
  id_user: number;

  @ApiProperty({ example: 'infinite_potato' })
  username: string;

  @ApiProperty({ example: 'drummer boi', nullable: true })
  band_role: string | null;

  @ApiProperty({ example: false, required: false })
  isAdmin: boolean;

  @ApiProperty({
    required: false,
    example: 'https://avatar.url/me.png',
    nullable: true,
  })
  profile_picture: string | null;

  commentCount: number;
}
