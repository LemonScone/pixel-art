import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { DbService } from '../db/db.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DbService, AuthService, JwtService],
})
export class UsersModule {}
