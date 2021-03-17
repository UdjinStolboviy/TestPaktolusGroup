import { Injectable, NestMiddleware } from '@nestjs/common';
import { MiddlewareConfiguration } from '@nestjs/common/interfaces/';
import * as passport from 'passport';

@Injectable()
export class StrategyMiddleware implements NestMiddleware {
  constructor() {
  }
  use(req: any, res: any, next: () => void) {
    throw new Error('Method not implemented.');
  }

  async resolve(...args: any[]): Promise<MiddlewareConfiguration> {
    if (args.length === 0 || !args[0].provider) {
      throw new Error('Missing provider for authenticate oauth');
    }
    const provider = args[0].provider;
    return passport.authenticate(provider, { scope: ['profile', 'email'] });
  }
}