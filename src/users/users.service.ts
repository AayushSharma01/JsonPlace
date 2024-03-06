import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, User_Model } from './usersmodel';
import mongoose, { Model } from 'mongoose';
import { UserFilter, UserInput } from './dto/users.input';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User_Model)private userModel:Model<User>){}

    async getUsers(userfilter:UserFilter):Promise<User[]>{
        if(userfilter._id){
            const id = new mongoose.Types.ObjectId(userfilter._id);
            return  await this.userModel.find({_id :id});
        }else{
            return await this.userModel.find(userfilter);
        }
        
    }

    async createUser(userInput:UserInput):Promise<User>{
        const res  = await this.userModel.create(userInput);
        return await res.save();
    }
}
