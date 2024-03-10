import { Test, TestingModule } from "@nestjs/testing";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

describe('PostsResolver' , ()=>{
    let postsService:PostsService;
    let postsResolver:PostsResolver;
    const mockPostsService = {
        getPost:jest.fn(),
        getPosts:jest.fn(),
        createPost:jest.fn()

    }
    const post = {
        _id: "65e7dba8b0d10404289eadb8",
        userId: "65e6d57eef6a588135464228",
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
    beforeEach(async()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                PostsResolver,
                {
                    provide:PostsService,
                    useValue:mockPostsService
                }
            ]
        }).compile();
        postsResolver = module.get<PostsResolver>(PostsResolver);
        postsService = module.get<PostsService>(PostsService);
    });

    describe('getPost', () => {
        it('should take _id and return post that matches _id', async () => {
            const _id = "65e7dba8b0d10404289eadb8";
            jest.spyOn(mockPostsService, 'getPost').mockImplementation(() => Promise.resolve(post));
            const result = await postsResolver.getPost(_id);
            expect(result).toEqual(post);
        })
    });

    describe('getPosts', () => {
        it('should take postFilter and return array of post', async () => {
            const postFilter = {
                userId: "65e6d57eef6a588135464228",
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                 
            }
            jest.spyOn(mockPostsService, 'getPosts').mockImplementation(() => Promise.resolve([post]));
            const result = await postsResolver.getPosts(postFilter);
            expect(result).toEqual([post]);
        });

    });

    describe('createPost', () => {
        it('should take newPost and createPost', async () => {
            const newPost = {
                userId: "65e6d57eef6a588135464228",
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            };
            jest.spyOn(mockPostsService, 'createPost').mockImplementation(() => Promise.resolve(post));
            const result = await postsResolver.createPost(newPost);
            expect(result).toEqual(post);
        });

    });




});