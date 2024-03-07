import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { POST_MODEL, Post } from './posts.model';
import { PostFilter, PostInput } from './dto/posts.input';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class PostsService {
    constructor(@InjectModel(POST_MODEL)private postModel:Model<Post>){}

    async getPost(_id: string): Promise<Post> {
        const isValidId = mongoose.isValidObjectId(_id);
        if (!isValidId) {
            throw new BadRequestException('please enter correct id');
        }
        const id = new mongoose.Types.ObjectId(_id);
        const result = await this.postModel.findById(id);

        if (!result) throw new NotFoundException('Post not found with given Id');

        return result;
    }

    async getPosts(postFilter:PostFilter):Promise<Post[]>{
        return await this.postModel.find(postFilter);
    }

    async createPost(postInput:PostInput):Promise<Post>{
        return await this.postModel.create(postInput);
 
    }
}
