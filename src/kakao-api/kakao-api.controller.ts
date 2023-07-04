import { Controller, Get } from '@nestjs/common';
import { KakaoApiService } from './kakao-api.service';

@Controller('kakao-api')
export class KakaoApiController {
  constructor(private readonly kakaoApiService: KakaoApiService) {}

  @Get('Duration')
  getDirections() {
    return this.kakaoApiService.getDuration();
  }
  // @Get('Direction')
  // getDirection() {
  //   return this.kakaoApiService.getDirection();
  // }
}
