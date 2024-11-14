import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserResponseDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private hashSaltOrRounds: number = 10;

  async login({ email, password: pass }: LoginDto): Promise<any> {
    try {
      const user = await this.userService.getUserByEmail(email);
      const isPasswordMatch = await bcrypt.compare(pass, user?.password);

      if (!isPasswordMatch) {
        throw new UnauthorizedException();
      }

      const access_token = await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
        email: user.email,
      });

      return { access_token };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async signup({
    username,
    email,
    password,
  }: SignUpDto): Promise<UserResponseDto> {
    const hashPass = await bcrypt.hash(password, this.hashSaltOrRounds);

    const newUser = await this.userService.createUser({
      username,
      email,
      password: hashPass,
    });

    return newUser;
  }
}
