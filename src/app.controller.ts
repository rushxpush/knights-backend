import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { delay, of } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @MessagePattern({ cmd: 'ping' })
  // ping() {
  //   return of('pong').pipe(delay(1000));
  // }
}
