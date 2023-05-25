import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
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
  @ApiBearerAuth('access-token')
  test(@Req() req) {
    console.log(req.user);
  }
}
