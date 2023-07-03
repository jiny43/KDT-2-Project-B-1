import { Test, TestingModule } from '@nestjs/testing';
import { KakaoApiService } from './kakao-api.service';

describe('KakaoApiService', () => {
  let service: KakaoApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KakaoApiService],
    }).compile();

    service = module.get<KakaoApiService>(KakaoApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
