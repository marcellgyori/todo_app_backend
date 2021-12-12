import { Task } from '../../tasks/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  tasks: Task[];

  constructor(name: string | undefined, email: string, password: string) {
    if (name) this.name = name;
    else this.name = undefined;
    this.email = email;
    this.password = password;
  }
}
