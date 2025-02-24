import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectModel('Pet') private petModel: Model<Pet>) {}
  async create(createPetDto: CreatePetDto) {
    const { name, specie, birthDate } = createPetDto;
    if (!name || !specie || !birthDate) {
      return { message: 'Please fill all fields' };
    }
    const newPet = await this.petModel.create(createPetDto);
    return { message: 'Pet created', payload: newPet };
  }

  async findAll() {
    return await this.petModel.find();
  }

  async findOne(id: string) {
    const pet = await this.petModel.findById(id);
    if (pet === null) {
      return { message: 'User not found' };
    }

    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    const res = await this.petModel.findById(id);
    if (res === null) {
      return { message: 'pet not found' };
    }
    const petData = res.toObject();
    const newPetData = { ...petData, ...updatePetDto };
    await this.petModel.findByIdAndUpdate(id, newPetData, { new: true });
    return { message: 'User has been updated', payload: newPetData };
  }

  async remove(id: string) {
    await this.petModel.findByIdAndDelete(id);
    return 'Pet has been removed';
  }
}
