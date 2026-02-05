import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 12, description: 'The unique ID of the user' })
  @PrimaryGeneratedColumn()
  id_user: number;

  @ApiProperty({
    example: 'infinite_potato',
    description: 'Unique username for the member',
  })
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ApiProperty({ example: false, default: false })
  @Column({ default: false })
  isAdmin: boolean;

  @ApiProperty({ required: false, example: 'https://avatar.url/me.png' })
  @Column({ nullable: true })
  profile_picture: string;
}
