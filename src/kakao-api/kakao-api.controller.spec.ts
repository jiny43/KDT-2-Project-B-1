import { Test, TestingModule } from '@nestjs/testing';
import { KakaoApiController } from './kakao-api.controller';
import { KakaoApiService } from './kakao-api.service';

describe('KakaoApiController', () => {
  let controller: KakaoApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KakaoApiController],
      providers: [KakaoApiService],
    }).compile();

    controller = module.get<KakaoApiController>(KakaoApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
