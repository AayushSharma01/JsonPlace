import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';
import { CommentFilter, CommentInput } from './dto/comments.input';

@Resolver()
export class CommentsResolver {
    constructor(private commentService:CommentsService){}

    @Query(returns =>Comment)
    async getComment(@Args('_id')_id:string):Promise<Comment>{
        return this.commentService.getComment(_id);
    }

    @Query(returns =>[Comment])
    async getComments(@Args() commentFilter:CommentFilter):Promise<Comment[]>{
        return this.commentService.getComments(commentFilter);
    }

    @Mutation(returns => Comment)
    async createComment(@Args('commentInput')commentInput:CommentInput):Promise<Comment>{
      return this.commentService.createComment(commentInput);
    }
}
