import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<void> {
    return this.appService.test();
  }

  @Post('/authTest')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  test(@Req() req) {
    return req.user;
  }
}
