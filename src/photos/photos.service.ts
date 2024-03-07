import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PHOTO_MODEL, Photo } from './photos.model';
import mongoose, { Model } from 'mongoose';
import { PhotoFillter, PhotoInput } from './dto/photos.input';

@Injectable()
export class PhotosService {
    constructor(@InjectModel(PHOTO_MODEL)private photoModel:Model<Photo>){}

    async getPhoto(_id: string): Promise<Photo> {
        const isValidId = mongoose.isValidObjectId(_id);
        if (!isValidId) {
            throw new BadRequestException('please enter correct id');
        }
        const id = new mongoose.Types.ObjectId(_id);
        const result = await this.photoModel.findById(id);

        if (!result) throw new NotFoundException('Photo not found with given Id');

        return result;
    }
    async getPhotos(photoFilter:PhotoFillter):Promise<Photo[]>{
        return await this.photoModel.find(photoFilter);
    }

    async createPhoto(photoInput:PhotoInput):Promise<Photo>{
        return  await this.photoModel.create(photoInput);
       
    }
}
