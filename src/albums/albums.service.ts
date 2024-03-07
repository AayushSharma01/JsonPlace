import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { ALBUM_MODEL, Album } from './albums.model';
import { AlbumFilter, AlbumInput } from './dto/albums.input';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AlbumsService {
    constructor(@InjectModel(ALBUM_MODEL) private albumModel:Model<Album>){}

    async getAlbum(_id: string): Promise<Album> {
        const isValidId = mongoose.isValidObjectId(_id);
        if (!isValidId) {
            throw new BadRequestException('please enter correct id');
        }
        const id = new mongoose.Types.ObjectId(_id);
        const result = await this.albumModel.findById(id);

        if (!result) throw new NotFoundException('Ablum not found with given Id');

        return result;
    }
    async getAlbums(albumFilter:AlbumFilter):Promise<Album[]>{
        return await this.albumModel.find();
    }

    async createAlbum(albumInput:AlbumInput):Promise<Album>{
        return await this.albumModel.create(albumInput);
    }
}
