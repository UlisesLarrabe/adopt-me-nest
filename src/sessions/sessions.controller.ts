import { Body, Controller, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.sessionsService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.sessionsService.login(loginDto);
  }
}
