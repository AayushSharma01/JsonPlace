import { Module } from '@nestjs/common';
import { PhotosResolver } from './photos.resolver';
import { PhotosService } from './photos.service';
import { photoModelModule } from './photos.model';

@Module({
  imports:[photoModelModule],
  providers: [PhotosResolver, PhotosService]
})
export class PhotosModule {}
