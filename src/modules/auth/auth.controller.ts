import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserResponseDto } from '../user/dto/user.dto';
import { minutes, Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: SignUpDto): Promise<UserResponseDto> {
    return this.authService.signup(user);
  }

  @Throttle({ default: { limit: 10, ttl: minutes(10) } })
  @Post('login')
  async login(@Body() credentials: LoginDto): Promise<any> {
    return this.authService.login(credentials);
  }
}
