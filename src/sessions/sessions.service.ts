import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SessionsService {
  constructor(private readonly usersService: UsersService) {}
  async register(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser;
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
