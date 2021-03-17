import { Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { SessionAuthMiddleware } from './session-auth.middleware';
import { StrategyCallbackMiddleware } from './strategy-callback.middleware';
import { StrategyMiddleware } from './strategy.middleware';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/';

@Module({
  controllers: [AuthController],
  providers: [GoogleStrategy, SessionAuthMiddleware, StrategyCallbackMiddleware, StrategyMiddleware]
})
export class AuthModule implements NestModule {

  public configure(consumer: MiddlewareConsumer) {
    consumer
      // Saving the socketId on session
      .apply(SessionAuthMiddleware)
      .forRoutes('/auth/google')
      // Authenticate to google signin api for /auth/google route
      .apply(StrategyMiddleware)
      .forRoutes('/auth/google')
      // After signin google call this endpoint
      .apply(StrategyCallbackMiddleware).forRoutes('auth/google/callback');

  }
}
