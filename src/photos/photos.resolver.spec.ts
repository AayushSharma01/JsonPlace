import { Test, TestingModule } from "@nestjs/testing";
import { PhotosResolver } from "./photos.resolver";
import { PhotosService } from "./photos.service";
import { PostsResolver } from "src/posts/posts.resolver";

describe('PhotosResolver' , ()=>{

    let photosResolver:PhotosResolver;
    let photosService:PhotosService;
    const mockPhotosService = {
        getPhoto:jest.fn(),
        getPhotos:jest.fn(),
        createPhoto:jest.fn()
    };

    const photo =  {
        _id: "65e7ecdff4334576877198d8",
        albumId: "65e7eb4c247b8f3e569b0749",
        title: "reprehenderit est deserunt velit ipsam",
        url: "https://via.placeholder.com/600/771796",
        thumbnailUrl: "https://via.placeholder.com/150/771796"
      };

    beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                PhotosResolver, 
                {
                    provide:PhotosService,
                    useValue:mockPhotosService
                }
            ]
        }).compile();
        photosResolver = module.get<PhotosResolver>(PhotosResolver);
        photosService = module.get<PhotosService>(PhotosService);
    });

    describe('getPhoto', () => {
        it('should take _id and return photo that matches _id', async () => {
            const _id = "65e7ecdff4334576877198d8";
            jest.spyOn(mockPhotosService, 'getPhoto').mockImplementation(() => Promise.resolve(photo));
            const result = await photosResolver.getPhoto(_id);
            expect(result).toEqual(photo);
        })
    });

    describe('getPhotos', () => {
        it('should take photoFilter and return array of photo', async () => {
            const photoFilter ={
                albumId: "65e7eb4c247b8f3e569b0749",
                title: "reprehenderit est deserunt velit ipsam",
                url: "https://via.placeholder.com/600/771796",
                thumbnailUrl: "https://via.placeholder.com/150/771796"
                 
            };
            jest.spyOn(mockPhotosService, 'getPhotos').mockImplementation(() => Promise.resolve([photo]));
            const result = await photosResolver.getPhotos(photoFilter);
            expect(result).toEqual([photo]);
        });

    });

    describe('createPhoto', () => {
        it('should take newPhoto and createPhoto', async () => {
            const newPhoto = {
                albumId: "65e7eb4c247b8f3e569b0749",
                title: "reprehenderit est deserunt velit ipsam",
                url: "https://via.placeholder.com/600/771796",
                thumbnailUrl: "https://via.placeholder.com/150/771796"
            };
            jest.spyOn(mockPhotosService, 'createPhoto').mockImplementation(() => Promise.resolve(photo));
            const result = await photosResolver.createPhoto(newPhoto);
            expect(result).toEqual(photo);
        });
    });
});
