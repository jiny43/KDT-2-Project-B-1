import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 정적 파일 제공 설정
  app.useStaticAssets(join(__dirname, '..', 'client', 'build'));

  await app.listen(3001);
}
bootstrap();
