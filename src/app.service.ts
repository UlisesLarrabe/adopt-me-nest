import { Injectable } from '@nestjs/common';
import { PetsService } from './pets/pets.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private readonly petsService: PetsService,
    private readonly usersService: UsersService,
  ) {}

  async getAllUsers() {
    return await this.usersService.findAll();
  }

  async getAllPets() {
    return await this.petsService.findAll();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
