import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '../../comments/entity/comment.entity';

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

  @ApiProperty({
    example: 'drummer boi',
    description: 'Role of the user in the band',
  })
  @Column({ type: 'varchar', nullable: true })
  band_role: string | null;

  @Column()
  password: string;

  @ApiProperty({ example: false, default: false })
  @Column({ default: false })
  isAdmin: boolean;

  @ApiProperty({ required: false, example: 'https://avatar.url/me.png' })
  @Column({ type: 'varchar', nullable: true })
  profile_picture: string | null;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
