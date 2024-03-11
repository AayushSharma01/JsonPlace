import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AlbumsService } from './albums.service';
import { Album } from './albums.model';
import { AlbumFilter, AlbumInput } from './dto/albums.input';
import { UseGuards } from '@nestjs/common';
import { AuthGaurd } from 'src/guard/auth.gaurd';
import { Role } from 'src/decorators/roles.decorator';

@Resolver()
export class AlbumsResolver {
    constructor(private albumServices:AlbumsService){}

    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns=> Album)
    async getAlbum(@Args('_id')_id:string):Promise<Album>{
        return await this.albumServices.getAlbum(_id);
    }

    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns=> [Album])
    async getAlbums(@Args()albumFilter:AlbumFilter):Promise<Album[]>{
        return await this.albumServices.getAlbums(albumFilter);
        
    }

    @Role('admin')
    @UseGuards(AuthGaurd)
    @Mutation(returns => Album)
    async createAlbum(@Args('albumInput')albumInput:AlbumInput):Promise<Album>{
        return this.albumServices.createAlbum(albumInput);
    }
}
