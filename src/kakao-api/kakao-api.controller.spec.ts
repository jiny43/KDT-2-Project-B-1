import { Test, TestingModule } from '@nestjs/testing';
import { KakaoApiController } from './kakao-api.controller';

describe('KakaoApiController', () => {
  let controller: KakaoApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KakaoApiController],
    }).compile();

    controller = module.get<KakaoApiController>(KakaoApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
