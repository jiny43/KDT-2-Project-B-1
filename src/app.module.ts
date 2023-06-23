import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { reactModule } from './react.module';

@Module({
  imports: [reactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
