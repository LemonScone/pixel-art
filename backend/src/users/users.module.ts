import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { dbProvider } from 'src/db/db.provider';

@Module({
  providers: [UsersService, dbProvider],
  controllers: [UsersController],
})
export class UsersModule {}
