export interface UserDto {
  id_user: number,
  username: string,
  band_role: string | null,
  password: string,
  isAdmin: boolean | null,
  profile_picture: string | null
}
