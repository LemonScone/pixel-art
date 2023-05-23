import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<void> {
    return this.appService.test();
  }

  @Post('/authTest')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log({ req });
  }
}
