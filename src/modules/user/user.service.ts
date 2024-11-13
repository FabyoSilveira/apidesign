import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public getUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  public createUser(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }
}
