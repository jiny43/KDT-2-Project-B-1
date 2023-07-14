import { Controller, Get, Param } from '@nestjs/common';
import { KakaoApiguidance } from './kakao-guidance.service';
@Controller('kakao-guidance')
export class KakaoGuidanceController {
  constructor(private readonly kakaoApiguidance: KakaoApiguidance) {}
  // 2.가이드 요청이 "왔을떄", /kakao-api/guidance으로 요청이 "왔을때"
  @Get('guidance/:origin')
  async getGuidance(@Param('origin') origin: string) {
    return await this.kakaoApiguidance.getGuidance(origin);
  }
}
