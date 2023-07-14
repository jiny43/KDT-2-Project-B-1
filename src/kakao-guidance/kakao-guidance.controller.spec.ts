import { Test, TestingModule } from '@nestjs/testing';
import { KakaoGuidanceController } from './kakao-guidance.controller';

describe('KakaoGuidanceController', () => {
  let controller: KakaoGuidanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KakaoGuidanceController],
    }).compile();

    controller = module.get<KakaoGuidanceController>(KakaoGuidanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
