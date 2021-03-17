import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import * as expressSession from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add websocket on your server
  app.useWebSocketAdapter(app.getHttpServer());
  // Connecting sockets to the server and adding them to the request
  // so that we can access them later in the controller
  app.getHttpServer()


  app.use(passport.initialize());
  app.use(passport.session());
  app.use(expressSession({
    secret: 'TWC_2021',
    resave: true,
    saveUninitialized: true,
  }));

  await app.listen(8080);

}
bootstrap();
