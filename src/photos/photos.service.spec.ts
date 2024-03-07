import mongoose, { Model } from "mongoose"
import { PHOTO_MODEL, Photo } from "./photos.model"
import { PhotosService } from "./photos.service"
import { Test, TestingModule } from "@nestjs/testing"
import { getModelToken } from "@nestjs/mongoose"
import { BadRequestException, NotFoundException } from "@nestjs/common"

 
describe('PhotosService' ,()=>{
    let photosService:PhotosService
    let model:Model<Photo>

    const photo =  {
        _id: "65e7ecdff4334576877198d8",
        albumId: "65e7eb4c247b8f3e569b0749",
        title: "reprehenderit est deserunt velit ipsam",
        url: "https://via.placeholder.com/600/771796",
        thumbnailUrl: "https://via.placeholder.com/150/771796"
      }

    const mockPhotoModel = {
        findById: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
    }

    beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                PhotosService,
                {
                    provide:getModelToken(PHOTO_MODEL),
                    useValue: mockPhotoModel
                }
            ]
        }).compile();

        photosService = module.get<PhotosService>(PhotosService);
        model = module.get<Model<Photo>>(getModelToken(PHOTO_MODEL));
    })

    describe('getPhoto' , ()=>{
        it('should find Photo and return using findById' , async()=>{
            jest.spyOn(model , 'findById').mockResolvedValue(photo);
            const result = await photosService.getPhoto(photo._id);
            expect(result).toEqual(photo);
        })

        it('should throw BadExpectionRequest if _id is invalid' , async()=>{
            const id = 'invalid-id';
            const isValidObjectIdMock = jest.spyOn(mongoose , 'isValidObjectId').mockReturnValue(false);
            await expect(photosService.getPhoto(id)).rejects.toThrow(
                BadRequestException
            );
            isValidObjectIdMock.mockRestore();
        });

        it('should throw NotFoundExpection if given Id is not exists' , async ()=>{
            jest.spyOn(model , 'findById').mockResolvedValue(null);
            await expect(photosService.getPhoto(photo._id)).rejects.toThrow(
                NotFoundException
            );
        })
    });

    describe('getPhotos' , ()=>{
        it('should take photo properties as argument and return array of photo' , async ()=>{
            const photoFilter = {
                albumId: "65e7eb4c247b8f3e569b0749",
                title: "reprehenderit est deserunt velit ipsam",
                url: "https://via.placeholder.com/600/771796",
                thumbnailUrl: "https://via.placeholder.com/150/771796"
                 
            }
    
            const photos = [photo];
            jest.spyOn(model , 'find').mockResolvedValue(photos);
            const result = await photosService.getPhotos(photoFilter);
            expect(result).toEqual(photos);
        })
        
    });

    describe('createPhoto' , ()=>{
        it('should take photoInput and create new Photo' , async ()=>{
            const newPhoto = {
                albumId: "65e7eb4c247b8f3e569b0749",
                title: "reprehenderit est deserunt velit ipsam",
                url: "https://via.placeholder.com/600/771796",
                thumbnailUrl: "https://via.placeholder.com/150/771796"
            };

            jest.spyOn(model , 'create').mockResolvedValue(photo as any);
            const result = await photosService.createPhoto(newPhoto);
            expect(result).toEqual(photo);
        })
    })

})