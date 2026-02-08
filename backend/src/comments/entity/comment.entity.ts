import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Track } from '../../tracks/entity/track.entity';

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

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Comment;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Track, (track) => track.comments)
  @JoinColumn({ name: 'track_id' })
  track: Track;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];
}
