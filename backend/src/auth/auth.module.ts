import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { dbProvider } from 'src/db/db.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, dbProvider],
})
export class AuthModule {}
