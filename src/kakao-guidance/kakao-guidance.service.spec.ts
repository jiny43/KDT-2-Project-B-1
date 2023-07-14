import { Test, TestingModule } from '@nestjs/testing';
import { KakaoApiguidance } from './kakao-guidance.service';

describe('KakaoGuidanceService', () => {
  let service: KakaoApiguidance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KakaoApiguidance],
    }).compile();

    service = module.get<KakaoApiguidance>(KakaoApiguidance);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
