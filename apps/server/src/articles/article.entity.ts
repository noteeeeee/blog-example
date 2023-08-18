import { User } from 'src/users';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @Column('longtext')
  content: string;

  @JoinColumn()
  @ManyToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
    persistence: false,
  })
  author: User;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
