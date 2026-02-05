import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entity/comment.entity';
import { Project } from '../../projects/entity/project.entity';

@Entity('tracks')
export class Track {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id_track: number;

  @ApiProperty({ example: 'Bass Demo v2' })
  @Column()
  track_name: string;

  @ApiProperty({ example: 1.02 })
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 1.0 })
  version: number;

  @ApiProperty({ example: 'https://storage.url/file.mp3' })
  @Column()
  file_url: string;

  @CreateDateColumn()
  uploaded_at: Date;

  @ManyToOne(() => Project, (project) => project.tracks)
  project: Project;

  @ManyToOne(() => User)
  uploader: User;

  @OneToMany(() => Comment, (comment) => comment.track)
  comments: Comment[];

  @ManyToOne(() => Track, (track) => track.child_versions, { nullable: true })
  parent_track: Track;

  @OneToMany(() => Track, (track) => track.parent_track)
  child_versions: Track[];
}
