
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './posts.model';
import { PostsService } from './posts.service';
import { PostFilter, PostInput } from './dto/posts.input';
import { AuthGaurd } from 'src/guard/auth.gaurd';
import { UseGuards } from '@nestjs/common';
import { Role } from 'src/decorators/roles.decorator';

@Resolver()
export class PostsResolver {
    constructor(private postService:PostsService){}

    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns => Post)
    async getPost(@Args('_id')_id:string):Promise<Post>{
        return await this.postService.getPost(_id);
    }
    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns => [Post])
    async getPosts(@Args()postFilter:PostFilter):Promise<Post[]>{
        return this.postService.getPosts(postFilter);
    }


     @Role('admin')
    @UseGuards(AuthGaurd)
    @Mutation(returns => Post)
    async createPost(@Args('postInput')postInput:PostInput):Promise<Post>{
      return this.postService.createPost(postInput);
    }
}
