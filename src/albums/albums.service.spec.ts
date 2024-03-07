
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { AlbumsService } from "./albums.service"
import mongoose, { Model } from "mongoose"
import { ALBUM_MODEL, Album } from "./albums.model"
import { Test, TestingModule } from "@nestjs/testing"
import { getModelToken } from "@nestjs/mongoose"


describe('AlbumsService', () => {
    let albumsService: AlbumsService
    let model: Model<Album>

    const album = {
        _id: "65e7eb4c247b8f3e569b0749",
        userId: "65e6d57eef6a588135464228",
        title: "quidem molestiae enim"
    }

    const mockAlbumModel = {
        findById: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AlbumsService,
                {
                    provide: getModelToken(ALBUM_MODEL),
                    useValue: mockAlbumModel
                }
            ]
        }).compile();

        albumsService = module.get<AlbumsService>(AlbumsService);
        model = module.get<Model<Album>>(getModelToken(ALBUM_MODEL));
    })

    describe('getAlbum', () => {
        it('should find Album and return using findById', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(album);
            const result = await albumsService.getAlbum(album._id);
            expect(result).toEqual(album);
        })

        it('should throw BadExpectionRequest if _id is invalid', async () => {
            const id = 'invalid-id';
            const isValidObjectIdMock = jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(false);
            await expect(albumsService.getAlbum(id)).rejects.toThrow(
                BadRequestException
            );
            isValidObjectIdMock.mockRestore();
        });

        it('should throw NotFoundExpection if given Id is not exists', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(null);
            await expect(albumsService.getAlbum(album._id)).rejects.toThrow(
                NotFoundException
            );
        })
    });

    describe('getAlbums', () => {
        it('should take album properties as argument and return array of album', async () => {
            const albumFilter = {
                userId: "65e6d57eef6a588135464228",
                title: "quidem molestiae enim"
            }


            const albums = [album];
            jest.spyOn(model, 'find').mockResolvedValue(albums);
            const result = await albumsService.getAlbums(albumFilter);
            expect(result).toEqual(albums);
        })

    });

    describe('createAlbum', () => {
        it('should take albumInput and create new Album', async () => {
            const newAlbum = {
                userId: "65e6d57eef6a588135464228",
                title: "quidem molestiae enim"
            };

            jest.spyOn(model, 'create').mockResolvedValue(album as any);
            const result = await albumsService.createAlbum(newAlbum);
            expect(result).toEqual(album);
        })
    })

})