import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KakaoApiService } from './kakao-api/kakao-api.service';
import { KakaoApiController } from './kakao-api/kakao-api.controller';

@Module({
  imports: [],
  controllers: [AppController, KakaoApiController],
  providers: [AppService, KakaoApiService],
})
export class AppModule {}