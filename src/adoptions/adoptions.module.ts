import { Module } from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';
import { AdoptionsController } from './adoptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdoptionSchema } from './entities/adoption.entity';
import { UserSchema } from 'src/users/entities/user.entity';
import { PetsSchema } from 'src/pets/entities/pet.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Adoption', schema: AdoptionSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Pet', schema: PetsSchema }]),
  ],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}
