import { Controller, Get, Param } from '@nestjs/common';
import { KakaoApiService } from './kakao-api.service';
// 0. 모든뿌리, 요청은 /kakao-api로 시작합니당.
@Controller('kakao-api')
export class KakaoApiController {
  constructor(private readonly kakaoApiService: KakaoApiService) {}
  // 1.좌표값 요청 "왔을때", /kakao-api-direction으로 요청이 "왔을때"
  @Get('directions/:origin')
  async getDirections(@Param('origin') origin: string) {
    return await this.kakaoApiService.getDirections(origin);
  }
  // 2.가이드 요청이 "왔을떄", /kakao-api/guidance으로 요청이 "왔을때"
  // @Get('guidance/:origin')
  // async getGuidance(@Param('origin') origin: string) {
  //   return await this.kakaoApiService.getGuidance(origin);
  // }
  // // 3.거리를 구하는 요청이 "왔을때" , /kakao-api-distance로 요청이 "왔을때"
  // @Get('distance/:origin')
  // async getDistance(@Param('origin')origin :string){
  //   return await this.kakaoApiService.getDistance(origin);
  // }
}
