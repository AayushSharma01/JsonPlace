import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { commentModelModule } from './comments.model';

@Module({
  imports:[commentModelModule],
  providers: [CommentsResolver, CommentsService]
})
export class CommentsModule {}
