import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from './dto/sign.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @IsPublic()
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  @IsPublic()
  signIn(@Body() signInDto: SignDto) {
    return this.authService.signin(signInDto);
  }
}
