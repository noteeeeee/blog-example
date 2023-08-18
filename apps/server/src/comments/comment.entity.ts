import { Article } from 'src/articles';
import { User } from 'src/users';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  content: string;

  @JoinColumn()
  @ManyToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
    persistence: false,
  })
  author: User;

  @JoinColumn()
  @ManyToOne(() => Article, {
    cascade: true,
    onDelete: 'CASCADE',
    persistence: false,
  })
  article: Article;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
