import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entity/comment.entity';
import { Project } from '../../projects/entity/project.entity';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn()
  id_track: number;

  @Column()
  track_name: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 1.0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  version: number;

  @Column()
  file_url: string;

  @Column({ type: 'float', nullable: true })
  duration: number | null;

  @CreateDateColumn()
  uploaded_at: Date;

  @ManyToOne(() => Project, (project) => project.tracks, {
    onDelete: 'CASCADE',
  })
  project: Project;
  @ManyToOne(() => User)
  uploader: User;

  @OneToMany(() => Comment, (comment) => comment.track)
  comments: Comment[];

  @ManyToOne(() => Track, (track) => track.child_versions, { nullable: true })
  parent_track: Track | null;

  @OneToMany(() => Track, (track) => track.parent_track)
  child_versions: Track[] | null;

  commentCount?: number;
}
