import { Injectable, NestMiddleware } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/'
import { NextFunction } from 'express';

@Injectable()
export class StrategyCallbackMiddleware implements NestMiddleware {
  constructor() {
  }
  use(req: any, res: any, next: () => void) {
    throw new Error('Method not implemented.');
  }

  async resolve(...args: any[]): Promise<MiddlewareConsumer> {
    return async (req: any, res: any, next: NextFunction) => {
      const io = req.app.get('io');
      const user = {
        name: req.user.displayName,
        photo: req.user.photo,
      };
      io.in(req.session.socketId).emit(args[0].provider, user);
      res.end();
    };

  }
}