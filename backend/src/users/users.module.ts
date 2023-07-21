import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { dbProvider } from '../db/db.provider';

@Module({
  providers: [UsersService, dbProvider],
  controllers: [UsersController],
})
export class UsersModule {}
