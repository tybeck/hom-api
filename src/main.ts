import {NestFactory} from '@nestjs/core';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {config} from 'dotenv';

import {AppModule} from '@hom-module/app';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}

bootstrap();
