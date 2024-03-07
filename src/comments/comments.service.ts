import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { COMMENT_MODEL, Comment } from './comments.model';
import mongoose, { Model } from 'mongoose';
import { CommentFilter, CommentInput } from './dto/comments.input';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(COMMENT_MODEL)private commentModel:Model<Comment>){}

    async getComment(_id: string): Promise<Comment> {
        const isValidId = mongoose.isValidObjectId(_id);
        if (!isValidId) {
            throw new BadRequestException('please enter correct id');
        }
        const id = new mongoose.Types.ObjectId(_id);
        const result = await this.commentModel.findById(id);

        if (!result) throw new NotFoundException('Comment not found with given Id');

        return result;
    }

    async getComments(commentFilter:CommentFilter):Promise<Comment[]>{
        return await this.commentModel.find(commentFilter);
    }

    async createComment(commentInput:CommentInput):Promise<Comment>{
        return await this.commentModel.create(commentInput);
        
    }
}
