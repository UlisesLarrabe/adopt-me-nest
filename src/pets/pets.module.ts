import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsSchema } from './entities/pet.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pet', schema: PetsSchema }])],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
