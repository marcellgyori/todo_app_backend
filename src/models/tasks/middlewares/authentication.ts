import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const PREFIX = 'Bearer';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction): void {
    const headerAuthorization: string = req.headers.authorization;
    try {
      if (
        !headerAuthorization ||
        headerAuthorization.split(' ')[0] !== PREFIX ||
        headerAuthorization.split(' ').length !== 2
      )
        throw new Error();

      const token: string = headerAuthorization.split(' ')[1];

      const { userId } = verify(token, process.env.SECRET_CODE) as { userId };
      req.body.userId = userId;
      next();
    } catch {
      res.status(401).json({
        message: 'Invalid token',
      });
    }
  }
}
