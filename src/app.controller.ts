import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import express, { Response } from 'express';
import path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  getIndex(@Res() res: Response): void {
    res.setHeader('content-type', 'text/html');
    res.sendFile(path.join(__dirname, '..', 'react', 'index.html'));
  }
}
