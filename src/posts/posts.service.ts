import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { POST_MODEL, Post } from './posts.model';
import { PostFilter, PostInput } from './dto/posts.input';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class PostsService {
    constructor(@InjectModel(POST_MODEL)private postModel:Model<Post>){}

    async getPosts(postFilter:PostFilter):Promise<Post[]>{
        if(postFilter._id){
            const id = new mongoose.Types.ObjectId(postFilter._id);
            return await this.postModel.find({_id:id});
        }
        return await this.postModel.find(postFilter);
    }

    async createPost(postInput:PostInput):Promise<Post>{
        const res = await this.postModel.create(postInput);
        return await res.save();
    }
}
