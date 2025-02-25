import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
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

  async login(loginDto: { email: string; password: string }) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    await this.verifyPassword(loginDto.password, user.password);
    const token = this.jwtService.sign({ id: user._id });
    return { access_token: token };
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid password');
    }
  }
}
