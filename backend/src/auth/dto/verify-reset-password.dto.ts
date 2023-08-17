import { PickType } from '@nestjs/swagger';
import { ResetPasswordDto } from './reset-password.dto';

export class VerifyResetPasswordDto extends PickType(ResetPasswordDto, [
  'token',
] as const) {}
