import { getRepository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Task } from './entities/task.entity';

class TaskRepo {
  constructor() {}

  async findAll(userId): Promise<Task[] | undefined> {
    return await getRepository(User)
      .createQueryBuilder()
      .relation(User, 'tasks')
      .of(userId)
      .loadMany();
  }

  async findTask(task: Task): Promise<Task> {
    return getRepository(Task).findOne({ where: { id: task.id } });
  }

  async saveTask(task: Task, user: User) {
    const taskToSave = new Task(task.title);
    taskToSave.user = user;
    getRepository(Task).manager.save(taskToSave);
    return {
      message: `Task is succesfully saved (id ${taskToSave.id}).`,
    };
  }

  async updateTask(task: Task): Promise<Task> {
    if ((await this.findTask(task)) === undefined) return undefined;
    let taskToSave = await getRepository(Task).save(task);
    return taskToSave;
  }

  async deleteTask(task: Task): Promise<boolean> {
    if ((await this.findTask(task)) === undefined) {
      return false;
    }
    await getRepository(Task)
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where('id = :id', { id: task.id })
      .execute();
    if ((await this.findTask(task)) === undefined) {
      return true;
    }
    return false;
  }
}

export { TaskRepo };
