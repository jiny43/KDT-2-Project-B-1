import { Controller, Get, Param } from '@nestjs/common';
import { KakaoApiService } from './kakao-api.service';

@Controller('kakao-api')
export class KakaoApiController {
  constructor(private readonly kakaoApiService: KakaoApiService) {}

  @Get('directions/:origin')
  getDirections(@Param('origin') origin: string) {
    return this.kakaoApiService.getDirections(origin);
  }
}
