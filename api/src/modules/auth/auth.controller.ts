import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from './dto/sign.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @IsPublic()
  signIn(@Body() signInDto: SignDto) {
    return this.authService.sign(signInDto);
  }
}
