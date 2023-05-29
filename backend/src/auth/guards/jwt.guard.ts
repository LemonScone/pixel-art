import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = request
        .get('Authorization')
        .replace('Bearer', '')
        .trim();

      const user = await this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      request.user = user;
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
