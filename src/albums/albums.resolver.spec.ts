import { Test, TestingModule } from "@nestjs/testing";
import { AlbumsResolver } from "./albums.resolver"
import { AlbumsService } from "./albums.service"

describe('AlbumsResolver' , ()=>{
    let albumsResolver:AlbumsResolver;
    let albumsService:AlbumsService;

    const mocksAlbumsService = {
        getAlbum:jest.fn(),
        getAlbums:jest.fn(),
        createAlbum:jest.fn()
    };

    const album = {
        _id: "65e7eb4c247b8f3e569b0749",
        userId: "65e6d57eef6a588135464228",
        title: "quidem molestiae enim"
    };

    beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                AlbumsResolver,
                {
                    provide:AlbumsService,
                    useValue:mocksAlbumsService
                }
            ]
        }).compile();

        albumsResolver = module.get<AlbumsResolver>(AlbumsResolver);
        albumsService  = module.get<AlbumsService>(AlbumsService);
    });


    describe('getAblum', () => {
        it('should take _id and return album that matches _id', async () => {
            const _id = "65e7eb4c247b8f3e569b0749";
            jest.spyOn(mocksAlbumsService, 'getAlbum').mockImplementation(() => Promise.resolve(album));
            const result = await albumsResolver.getAlbum(_id);
            expect(result).toEqual(album);
        })
    });

    describe('getAlbums', () => {
        it('should take albumFilter and return array of album', async () => {
            const albumFilter ={
                userId: "65e6d57eef6a588135464228",
                title: "quidem molestiae enim"
            };
            jest.spyOn(mocksAlbumsService, 'getAlbums').mockImplementation(() => Promise.resolve([album]));
            const result = await albumsResolver.getAlbums(albumFilter);
            expect(result).toEqual([album]);
        });

    });

    describe('createAlbum', () => {
        it('should take newAlbum and createAlbum', async () => {
            const newAlbum = {
                userId: "65e6d57eef6a588135464228",
                title: "quidem molestiae enim"
            };
            jest.spyOn(mocksAlbumsService, 'createAlbum').mockImplementation(() => Promise.resolve(album));
            const result = await albumsResolver.createAlbum(newAlbum);
            expect(result).toEqual(album);
        });
    });
})