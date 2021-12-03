import { Body, Controller, Get, Request, Post } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

const PREFIX = 'Bearer';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('find')
  async findAllTasks(@Request() req) {
    const userId: number = req.body.userId;
    const taskList = await this.taskService.findAllTasks(userId);
    return taskList;
  }

  @Post('create')
  async createTask(@Request() req) {
    const userId: number = req.body.userId;
    const task = req.body;
    return await this.taskService.createTask(task, userId);
  }

  @Post('delete')
  async deleteTask(@Request() req) {
    const task = req.body;
    return await this.taskService.deleteTask(task);
  }

  @Post('update')
  async updateTask(@Body() request: Task): Promise<Task> {
    return await this.taskService.updateTask(request);
  }
}
