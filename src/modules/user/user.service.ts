import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserResponseDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { User } from './schema/user.schema';
import { SignUpDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByEmail(_email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(_email);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async createUser(user: SignUpDto): Promise<UserResponseDto> {
    const userExists = await this.userRepository.findUserByEmail(user.email);

    if (userExists) {
      throw new ConflictException('User already exists!');
    }

    const newUser = await this.userRepository.createUser(user);

    return this.getUserResponseDto(newUser);
  }

  getUserResponseDto({ id, username, email }: User): UserResponseDto {
    return { id, username, email };
  }
}
