import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { object, string, ValidationError } from 'yup';
import { UserRepo } from './user.repository';
import { verify } from 'argon2';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UserRepo) {}

  async findUserById(userId: number) {
    return await this.usersRepository.findUserById(userId);
  }

  async registerUser(
    user: User
  ): Promise<{ message: string[] } | Partial<User>> {
    const schema = object().shape({
      name: string()
        .matches(
          new RegExp('^[a-zA-Z]{4,20}'),
          'Please use only alphabetical letters.'
        )
        .required(),
      email: string()
        .matches(
          new RegExp('[A-Z0-9a-z._-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}'),
          'Please use only alphabetical letters.'
        )
        .required(),
      password: string()
        .matches(
          new RegExp('^[a-zA-Z0-9]{8,30}$'),
          'Password must be at least 8 characters.'
        )
        .required(),
    });

    try {
      await schema.validate(user, { abortEarly: false });
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        const { errors } = err;
        if (errors) return { message: errors };
      }
    }

    if (await this.usersRepository.findUserByEmail(user.email)) {
      return { message: ['Email is already taken.'] };
    }

    const newUser = await this.usersRepository.saveNewUser(user);
    return { id: newUser.id, email: newUser.email };
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ message: string[] } | { token: string }> {
    const schema = object().shape({
      email: string().required(),
      password: string().required(),
    });

    const login = { email, password };
    try {
      await schema.validate(login, { abortEarly: false });
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        const { errors } = err;
        if (errors) return { message: errors };
      }
    }

    const user = await this.usersRepository.findUserByEmail(email);

    if (null == user) {
      return { message: ['Email is incorrect.'] };
    }
    const validPassword = await verify(user.password, password);

    if (!validPassword) {
      return { message: ['Password is incorrect.'] };
    }

    const token = sign(
      {
        userId: user.id,
        userName: user.name,
      },
      process.env.SECRET_CODE,
      { expiresIn: process.env.EXPIRY_TIME }
    );
    return { token };
  }
}
