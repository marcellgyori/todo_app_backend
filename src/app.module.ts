import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/users/entities/user.entity';
import { UsersModule } from './models/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './models/tasks/tasks.module';
import { Task } from './models/tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'dashboard',
      entities: [User, Task],
      synchronize: true,
    }),
    UsersModule,
    TaskModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
