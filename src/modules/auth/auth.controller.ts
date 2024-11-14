import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { UserResponseDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: SignUpDto): Promise<UserResponseDto> {
    return this.authService.signup(user);
  }

  @Post('login')
  async login(@Body() credentials: LoginDto): Promise<any> {
    return this.authService.login(credentials);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
