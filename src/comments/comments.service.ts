import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { COMMENT_MODEL, Comment } from './comments.model';
import mongoose, { Model } from 'mongoose';
import { CommentFilter, CommentInput } from './dto/comments.input';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(COMMENT_MODEL)private commentModel:Model<Comment>){}

    async getComments(commentFilter:CommentFilter):Promise<Comment[]>{
        if(commentFilter._id){
            const id = new mongoose.Types.ObjectId(commentFilter._id);
            return await this.commentModel.find({_id:id});
        }
        return await this.commentModel.find(commentFilter);
    }

    async createComment(commentInput:CommentInput):Promise<Comment>{
        const res = await this.commentModel.create(commentInput);
        return await res.save();
    }
}
