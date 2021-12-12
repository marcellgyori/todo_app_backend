import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

describe('AppController', () => {
  let authController: AuthController;

  class AuthServiceMock {
    async registerUser(
      user: User
    ): Promise<{ message: string[] } | Partial<User>> {
      return await { message: ['Good result!'] };
    }
  }

  beforeEach(async () => {
    const AuthServiceProvider = {
      provide: AuthService,
      useClass: AuthServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceProvider],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "Good result!"', async () => {
      let user = {
        name: 'test',
        email: 'test@test.hu',
        password: 'testtest',
      } as User;
      let result = { message: ['Good result!'] };
      expect(JSON.stringify(await authController.registerUser(user))).toBe(
        JSON.stringify(result)
      );
    });
  });
});
