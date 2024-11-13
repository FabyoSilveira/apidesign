import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getUserByEmail(@Query('email') email: string): Promise<User | null> {
    return this.userService.getUserByEmail(email);
  }

  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }
}
