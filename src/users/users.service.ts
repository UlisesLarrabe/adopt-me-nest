import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    if (
      createUserDto.first_name === '' ||
      createUserDto.last_name === '' ||
      createUserDto.email === '' ||
      createUserDto.password === ''
    ) {
      return { message: 'Please fill all fields' };
    }
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user !== null) {
      return { message: 'User already exists' };
    }

    const newUser = this.userModel.create(createUserDto);
    return { message: 'User created', payload: newUser };
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (user === null) {
      return { message: 'User not found' };
    }
    user.password = '';
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const res = await this.userModel.findById(id);
    if (res === null) {
      return { message: 'User not found' };
    }
    const userData = res.toObject();
    const newUserData = { ...userData, ...updateUserDto };
    await this.userModel.findByIdAndUpdate(id, newUserData, { new: true });
    return { message: 'User has been updated', payload: newUserData };
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return 'User has been removed';
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user === null) {
      return null;
    }
    return user;
  }
}
