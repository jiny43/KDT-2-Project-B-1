import { Body, Controller, Post, Get } from '@nestjs/common';
import { KakaoApiService } from './kakao-api/kakao-api.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly kakaoApi: KakaoApiService,
    private readonly appService: AppService,
  ) {}
  @Post('inputData')
  handleInputData(@Body('value') value: string): { status: string } {
    try {
      console.log('입력한 input 정보 : ', value);
      return { status: '정보를 성공적으로 받아왔습니다.' };
    } catch (error) {
      console.error('정보를 받아오는데 실패했습니다.', error);
    }
  }

  @Get()
  async performTask(): Promise<string> {
    // const url = 'https://api.example.com/data';
    // const outputPath = './data.json';
    await this.appService.getHello();
    return 'Data fetched and saved!';
  }

  @Get('hello')
  findAll(): string {
    return 'hello~~!!';
  }
}
