import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignupDto } from './dto/signup.dto';
import { SignDto } from './dto/sign.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign')
  @IsPublic()
  sign(@Body() signDto: SignDto) {
    return this.authService.sign(signDto);
  }

  @Post('signup')
  @IsPublic()
  create(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
