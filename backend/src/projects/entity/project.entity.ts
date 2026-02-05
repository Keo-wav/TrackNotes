import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Track } from '../../tracks/entity/track.entity';

@Entity('projects')
export class Project {
  @ApiProperty({ example: 3 })
  @PrimaryGeneratedColumn()
  id_project: number;

  @ApiProperty({ example: 'Summer EP 2024' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Demos for the upcoming August release',
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 'https://cover-art.url/img.jpg', required: false })
  @Column({ nullable: true })
  picture: string;

  @ManyToOne(() => User, (user) => user.id_user)
  creator_id: User;

  @OneToMany(() => Track, (track) => track.project)
  tracks: Track[];
}
