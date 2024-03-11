import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PhotosService } from './photos.service';
import { Photo } from './photos.model';
import { PhotoFillter, PhotoInput } from './dto/photos.input';
import { UseGuards } from '@nestjs/common';
import { AuthGaurd } from 'src/guard/auth.gaurd';
import { Role } from 'src/decorators/roles.decorator';

@Resolver()
export class PhotosResolver {
    constructor(private photoSevice:PhotosService){}

    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns => Photo)
    async getPhoto(@Args('_id')_id:string):Promise<Photo>{
        return this.photoSevice.getPhoto(_id);
    }

    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns => [Photo])
    async getPhotos(@Args()photoFilter:PhotoFillter):Promise<Photo[]>{
        return this.photoSevice.getPhotos(photoFilter);
    }

    @Role('admin')
    @UseGuards(AuthGaurd)
    @Mutation(returns => Photo)
    async createPhoto(@Args('photoInput')photoInput:PhotoInput):Promise<Photo>{
      return this.photoSevice.createPhoto(photoInput);
    }
}
