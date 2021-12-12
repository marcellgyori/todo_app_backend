import { Body, Controller, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() request: User
  ): Promise<{ message: string[] } | Partial<User>> {
    return await this.authService.registerUser(request);
  }

  @Post('login')
  async loginUser(
    @Body() request: User
  ): Promise<{ message: string[] } | { token: string }> {
    return await this.authService.loginUser(request.email, request.password);
  }
}
