import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { UserRepo } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserRepo],
  controllers: [AuthController],
  exports: [AuthService, UserRepo],
})
export class UsersModule {}
