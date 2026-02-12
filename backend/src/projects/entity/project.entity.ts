import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Track } from '../../tracks/entity/track.entity';
import { Comment } from '../../comments/entity/comment.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id_project: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  picture: string | null;

  @ManyToOne(() => User, (user) => user.id_user)
  creator: User;

  @OneToMany(() => Track, (track) => track.project)
  tracks: Track[];

  @OneToMany(() => Comment, (comment) => comment.project)
  comments: Comment[];

  trackCount?: number;
  commentCount?: number;
}
