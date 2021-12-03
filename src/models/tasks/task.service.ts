import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UserRepo } from '../users/user.repository';
import { Task } from './entities/task.entity';
import { TaskRepo } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepo, private userRepo: UserRepo) {}

  async findAllTasks(userId): Promise<Task[]> {
    const taskList = await this.taskRepository.findAll(userId);
    return taskList;
  }

  async createTask(task: Task, userId: number) {
    const user: User = await this.userRepo.findUserById(userId);
    const taskToSave = await this.taskRepository.saveTask(task, user);
    return taskToSave;
  }

  async deleteTask(task: Task): Promise<boolean> {
    const isDeleted = await this.taskRepository.deleteTask(task);
    return isDeleted;
  }

  async updateTask(task: Task): Promise<Task> {
    const taskToUpdate = await this.taskRepository.updateTask(task);
    return taskToUpdate;
  }
}
