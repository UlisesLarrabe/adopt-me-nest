import { Controller, Get, Post, Param } from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';

@Controller('adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Get()
  findAll() {
    return this.adoptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adoptionsService.findOne(id);
  }

  @Post(':uid/:pid')
  create(@Param('uid') userId: string, @Param('pid') petId: string) {
    return this.adoptionsService.create(userId, petId);
  }
}
