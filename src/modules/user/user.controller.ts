import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { UserResponseDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getUserByEmail(
    @Query('email') email: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.getUserByEmail(email);

    return this.userService.getUserResponseDto(user);
  }
}
