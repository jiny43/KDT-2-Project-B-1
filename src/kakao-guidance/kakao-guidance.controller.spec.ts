import { Test, TestingModule } from '@nestjs/testing';
import { KakaoGuidanceController } from './kakao-guidance.controller';
import { KakaoApiguidance } from './kakao-guidance.service';
describe('KakaoGuidanceController', () => {
  let controller: KakaoGuidanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KakaoGuidanceController],
      providers: [
        {
          provide: KakaoApiguidance,
          useValue: {}, // 여기에 KakaoApiguidance의 모킹된 메소드들을 제공하세요.
        },
      ],
    }).compile();

    controller = module.get<KakaoGuidanceController>(KakaoGuidanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
