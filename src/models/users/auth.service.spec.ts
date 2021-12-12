import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { UserRepo } from './user.repository';

describe('AppController', () => {
  let authService: AuthService;
  let resUser = {
    id: 1,
    name: 'test',
    email: 'test@test.hu',
    password: 'testtest',
  } as User;

  class UserRepoMock {
    async saveNewUser(user: User): Promise<User> {
      return await resUser;
    }
    async findUserByEmail(user: User) {
      return false;
    }
  }

  beforeEach(async () => {
    const UserRepoProvider = {
      provide: UserRepo,
      useClass: UserRepoMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthService],
      providers: [UserRepoProvider],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('root', () => {
    it('should return "Good result!"', async () => {
      let user = {
        name: 'test',
        email: 'test@test.hu',
        password: 'testtest',
      } as User;
      expect(JSON.stringify(await authService.registerUser(user))).toBe(
        JSON.stringify({ id: resUser.id, email: resUser.email })
      );
    });
  });
});
