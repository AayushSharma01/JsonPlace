import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AlbumsService } from './albums.service';
import { Album } from './albums.model';
import { AlbumFilter, AlbumInput } from './dto/albums.input';

@Resolver()
export class AlbumsResolver {
    constructor(private albumServices:AlbumsService){}

    @Query(returns=> [Album])
    async getAlbums(@Args()albumFilter:AlbumFilter):Promise<Album[]>{
        return await this.albumServices.getAlbums(albumFilter);
        
    }

    @Mutation(returns => Album)
    async createAlbum(@Args('albumInput')albumInput:AlbumInput):Promise<Album>{
        return this.albumServices.createAlbum(albumInput);
    }
}
