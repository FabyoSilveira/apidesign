import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor() {}

  public getUser(id: string) {
    return `Hello user number ${id}`;
  }

  public createUser(user: CreateUserDto) {
    return `Creating user ${user.username}, ${user.email}, ${user.password}`;
  }
}
