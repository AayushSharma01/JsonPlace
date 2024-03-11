import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';
import { CommentFilter, CommentInput } from './dto/comments.input';
import { AuthGaurd } from 'src/guard/auth.gaurd';
import { UseGuards } from '@nestjs/common';
import { Role } from 'src/decorators/roles.decorator';

@Resolver()
export class CommentsResolver {
    constructor(private commentService:CommentsService){}

    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns =>Comment)
    async getComment(@Args('_id')_id:string):Promise<Comment>{
        return this.commentService.getComment(_id);
    }

    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns =>[Comment])
    async getComments(@Args() commentFilter:CommentFilter):Promise<Comment[]>{
        return this.commentService.getComments(commentFilter);
    }

    @Role('admin')
    @UseGuards(AuthGaurd)
    @Mutation(returns => Comment)
    async createComment(@Args('commentInput')commentInput:CommentInput):Promise<Comment>{
      return this.commentService.createComment(commentInput);
    }
}
