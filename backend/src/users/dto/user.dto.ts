export class UserDto {
  id_user: number;
  username: string;
  band_role: string | null;
  isAdmin: boolean;
  profile_picture: string | null;
  commentCount: number;
}
