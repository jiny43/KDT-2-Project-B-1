import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getIndex(@Res() res: Response): void {
    res.sendFile(join(__dirname, '..', 'frontend/index.html'));
  }

  @Get('bundle.js')
  getReactFile(@Res() res: Response): void {
    res.setHeader('content-type', 'application/javascript');
    res.sendFile(join(__dirname, '..', 'react', 'bundle.js'));
  }
}
