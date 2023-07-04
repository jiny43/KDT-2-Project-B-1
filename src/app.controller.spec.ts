import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KakaoApiService } from './kakao-api/kakao-api.service';

describe('AppController', () => {
  let appController: AppController;

  it('should be defined', () => {
    // replace the following with your actual test
    expect(true).toBe(true);
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, KakaoApiService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getDirections);
    });
  });
});
