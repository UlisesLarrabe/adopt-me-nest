import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Adoption } from './entities/adoption.entity';
import { User } from 'src/users/entities/user.entity';
import { Pet } from 'src/pets/entities/pet.entity';

@Injectable()
export class AdoptionsService {
  constructor(
    @InjectModel('Adoption') private adoptionModel: Model<Adoption>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Pet') private petModel: Model<Pet>,
  ) {}
  async create(userId: string, petId: string) {
    const user = await this.userModel.findById(userId);
    const pet = await this.petModel.findById(petId);
    if (user === null) {
      throw new BadRequestException('User not found');
    }
    if (pet === null) {
      throw new BadRequestException('Pet not found');
    }
    if (pet.adopted === true) {
      throw new BadRequestException('Pet already adopted');
    }
    user.pets.push(pet._id);
    await this.userModel.findByIdAndUpdate(userId, { pets: user.pets });
    await this.petModel.findByIdAndUpdate(petId, {
      adopted: true,
      owner: user._id,
    });
    await this.adoptionModel.create({ owner: user._id, pet: pet._id });
    return { message: 'adoption created' };
  }

  async findAll() {
    return await this.adoptionModel.find();
  }

  async findOne(id: string) {
    const adoption = await this.adoptionModel.findById(id);
    if (adoption === null) {
      return { message: 'adoption not found' };
    }
    return adoption;
  }

  update(id: string, updateAdoptionDto: UpdateAdoptionDto) {
    return `This action updates a #${id} adoption`;
  }

  remove(id: string) {
    return `This action removes a #${id} adoption`;
  }
}
