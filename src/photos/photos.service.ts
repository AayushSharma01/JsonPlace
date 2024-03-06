import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PHOTO_MODEL, Photo } from './photos.model';
import mongoose, { Model } from 'mongoose';
import { PhotoFillter, PhotoInput } from './dto/photos.input';

@Injectable()
export class PhotosService {
    constructor(@InjectModel(PHOTO_MODEL)private photoModel:Model<Photo>){}

    async getPhotos(photoFilter:PhotoFillter):Promise<Photo[]>{
        if(photoFilter._id){
            const id = new mongoose.Types.ObjectId(photoFilter._id);
            return await this.photoModel.find({_id:id});
        }
        return await this.photoModel.find(photoFilter);
    }

    async createPhoto(photoInput:PhotoInput):Promise<Photo>{
        const res = await this.photoModel.create(photoInput);
        return await res.save();
    }
}
