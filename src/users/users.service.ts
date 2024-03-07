import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, User_Model } from './usersmodel';
import mongoose, { Model } from 'mongoose';
import { UserFilter, UserInput } from './dto/users.input';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User_Model)private userModel:Model<User>){}

    async getUser(_id:string):Promise<User>{
        const isValidId = mongoose.isValidObjectId(_id);
        if(!isValidId) {
            throw new BadRequestException('please enter correct id');
        }
        const id = new mongoose.Types.ObjectId(_id);
        const result =  await this.userModel.findById(id);

        if(!result) throw new NotFoundException('User not found with given Id');

        return result;
    }

    async getUsers(userfilter:UserFilter):Promise<User[]>{
        return await this.userModel.find(userfilter);

    }

    async createUser(userInput:UserInput):Promise<User>{
        const res  = await this.userModel.create(userInput);
        return res;
    }
}
