import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PhotosService } from './photos.service';
import { Photo } from './photos.model';
import { PhotoFillter, PhotoInput } from './dto/photos.input';

@Resolver()
export class PhotosResolver {
    constructor(private photoSevice:PhotosService){}

    @Query(returns => [Photo])
    async getPhoto(@Args()photoFilter:PhotoFillter):Promise<Photo[]>{
        return this.photoSevice.getPhotos(photoFilter);
    }

    @Mutation(returns => Photo)
    async createPhoto(@Args('photoInput')photoInput:PhotoInput):Promise<Photo>{
      return this.photoSevice.createPhoto(photoInput);
    }
}
