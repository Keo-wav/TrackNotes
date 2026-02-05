import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Track } from './track.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id_comment: number;

  @Column('text')
  content: string;

  @Column({ type: 'float', nullable: true })
  timestamp: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Track, (track) => track.comments)
  track: Track;

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];
}
