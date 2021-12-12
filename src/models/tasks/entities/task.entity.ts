import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  title: string;

  @Column({ nullable: true, default: false })
  isDone: boolean;

  @ManyToOne(() => User, (user) => user.tasks, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  user: User;

  constructor(title: string) {
    this.title = title;
  }
}
