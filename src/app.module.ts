import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KakaoApiService } from './kakao-api/kakao-api.service';
import { KakaoApiController } from './kakao-api/kakao-api.controller';
import { AppController } from './app.controller';
// import { KakaoApiDirection } from './kakao-api/kakao-api-direction.service';
import { KakaoApiguidance } from './kakao-guidance/kakao-guidance.service';
import { KakaoGuidanceController } from './kakao-guidance/kakao-guidance.controller';

@Module({
  imports: [],
  controllers: [AppController, KakaoApiController, KakaoGuidanceController],
  providers: [AppService, KakaoApiService, KakaoApiguidance],
})
export class AppModule {}
