import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return;
  }

  @Get('allusers')
  @Render('allusers')
  async getUsers() {
    const users = await this.appService.getAllUsers();
    return { users };
  }

  @Get('allpets')
  @Render('allpets')
  async getPets() {
    const pets = await this.appService.getAllPets();
    return { pets };
  }
}
