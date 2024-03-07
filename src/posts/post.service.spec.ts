import mongoose, { Model } from "mongoose"
import { POST_MODEL, Post } from "./posts.model"
import { PostsService } from "./posts.service"
import { Test, TestingModule } from "@nestjs/testing"
import { getModelToken } from "@nestjs/mongoose"
import { BadRequestException, NotFoundException } from "@nestjs/common"

 
describe('PostsService' ,()=>{
    let postsService:PostsService
    let model:Model<Post>

    const post =  {
        _id: "65e7dba8b0d10404289eadb8",
        userId: "65e6d57eef6a588135464228",
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }

    const mockPostModel = {
        findById: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
    }

    beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                PostsService,
                {
                    provide:getModelToken(POST_MODEL),
                    useValue: mockPostModel
                }
            ]
        }).compile();

        postsService = module.get<PostsService>(PostsService);
        model = module.get<Model<Post>>(getModelToken(POST_MODEL));
    })

    describe('getPost' , ()=>{
        it('should find Post and return using findById' , async()=>{
            jest.spyOn(model , 'findById').mockResolvedValue(post);
            const result = await postsService.getPost(post._id);
            expect(result).toEqual(post);
        })

        it('should throw BadExpectionRequest if _id is invalid' , async()=>{
            const id = 'invalid-id';
            const isValidObjectIdMock = jest.spyOn(mongoose , 'isValidObjectId').mockReturnValue(false);
            await expect(postsService.getPost(id)).rejects.toThrow(
                BadRequestException
            );
            isValidObjectIdMock.mockRestore();
        });

        it('should throw NotFoundExpection if given Id is not exists' , async ()=>{
            jest.spyOn(model , 'findById').mockResolvedValue(null);
            await expect(postsService.getPost(post._id)).rejects.toThrow(
                NotFoundException
            );
        })
    });

    describe('getPosts' , ()=>{
        it('should take post properties as argument and return array of post' , async ()=>{
            const postFilter = {
                userId: "65e6d57eef6a588135464228",
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                 
            }
    
            const posts = [post];
            jest.spyOn(model , 'find').mockResolvedValue(posts);
            const result = await postsService.getPosts(postFilter);
            expect(result).toEqual(posts);
        })
        
    });

    describe('createPost' , ()=>{
        it('should take postInput and create new Post' , async ()=>{
            const newPost = {
                userId: "65e6d57eef6a588135464228",
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            };

            jest.spyOn(model , 'create').mockResolvedValue(post as any);
            const result = await postsService.createPost(newPost);
            expect(result).toEqual(post);
        })
    })

})