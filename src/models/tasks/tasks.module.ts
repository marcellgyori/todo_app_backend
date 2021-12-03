import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../users/auth.service';
import { UserRepo } from '../users/user.repository';
import { Task } from './entities/task.entity';
import { AuthenticationMiddleware } from './middlewares/authentication';
import { TaskController } from './task.controller';
import { TaskRepo } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService, TaskRepo, AuthService, UserRepo],
  controllers: [TaskController],
  exports: [TaskService, TaskRepo],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('/tasks');
  }
}
