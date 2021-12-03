import { getRepository } from 'typeorm';
import { hash } from 'argon2';
import { User } from './entities/user.entity';

class UserRepo {
  async findUserByEmail(email: string): Promise<User | undefined> {
    return getRepository(User).findOne({ where: { email } });
  }

  async saveNewUser(user: User): Promise<User> {
    const newUser = new User(user.name, user.email, await hash(user.password));
    return getRepository(User).manager.save(newUser);
  }

  async findUserById(id: number): Promise<User> {
    const user: User = await getRepository(User).findOne({ where: { id } });
    return user;
  }
}

export { UserRepo };
