import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { ALBUM_MODEL, Album } from './albums.model';
import { AlbumFilter, AlbumInput } from './dto/albums.input';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AlbumsService {
    constructor(@InjectModel(ALBUM_MODEL) private albumModel:Model<Album>){}

    async getAlbums(albumFilter:AlbumFilter):Promise<Album[]>{
        if(albumFilter._id){
            const id = new mongoose.Types.ObjectId(albumFilter._id);
            return await this.albumModel.find({_id:id});
        }
        return await this.albumModel.find();
    }

    async createAlbum(albumInput:AlbumInput):Promise<Album>{
        const res = await this.albumModel.create(albumInput);
        return await res.save();
    }
}
