import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.sessionsService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.sessionsService.login(loginDto);
  }

  @Get('current')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getCurrentUser(@Req() req: Request & { user: { id: string } }) {
    return { id: req.user.id };
  }
}
