import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import path from 'path';
import express, { Request, Response } from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  await app.init();
  server.use(express.static(path.join(__dirname, '..', 'dist', 'react')));
  app.getHttpAdapter().get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'react', 'index.html'));
  });
  await app.listen(3000);
}
bootstrap();
