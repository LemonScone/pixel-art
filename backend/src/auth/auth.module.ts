import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { dbProvider } from '../db/db.provider';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Module({
  imports: [PassportModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    dbProvider,
    JwtAuthGuard,
    JwtRefreshGuard,
    JwtRefreshStrategy,
    JwtService,
  ],
  exports: [PassportModule, JwtRefreshStrategy],
})
export class AuthModule {}
