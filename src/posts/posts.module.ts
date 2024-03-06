import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { postModelModule } from './posts.model';

@Module({
  imports:[postModelModule],
  providers: [PostsResolver, PostsService]
})
export class PostsModule {}
