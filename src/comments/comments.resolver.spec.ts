import { Test, TestingModule } from "@nestjs/testing";
import { CommentsResolver } from "./comments.resolver"
import { CommentsService } from "./comments.service";

describe('CommentsResolver' , ()=>{
    let commentsResover:CommentsResolver;
    let commnetsService:CommentsService;

    const mocksCommentsService = {
        getComment:jest.fn(),
        getComments:jest.fn(),
        createComment:jest.fn()
    };


    const comment =  {
        _id: "65e7edc74c8b0187e16697e3",
        postId: "65e7db8090db2bf42d1b56b5",
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      }

    beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                CommentsResolver,
                {
                    provide:CommentsService,
                    useValue:mocksCommentsService,
                }
            ]
        }).compile();
        commentsResover = module.get<CommentsResolver>(CommentsResolver);
        commnetsService = module.get<CommentsService>(CommentsService);
    });

    describe('getComment', () => {
        it('should take _id and return comment that matches _id', async () => {
            const _id = "65e7edc74c8b0187e16697e3";
            jest.spyOn(mocksCommentsService, 'getComment').mockImplementation(() => Promise.resolve(comment));
            const result = await commentsResover.getComment(_id);
            expect(result).toEqual(comment);
        })
    });

    describe('getComments', () => {
        it('should take commentFilter and return array of comment', async () => {
            const commentFilter = {
                postId: "65e7db8090db2bf42d1b56b5",
                name: "id labore ex et quam laborum",
                email: "Eliseo@gardner.biz",
                body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            };
            jest.spyOn(mocksCommentsService, 'getComments').mockImplementation(() => Promise.resolve([comment]));
            const result = await commentsResover.getComments(commentFilter);
            expect(result).toEqual([comment]);
        });

    });

    describe('createComment', () => {
        it('should take newComment and createComment', async () => {
            const newComment = {
                postId: "65e7db8090db2bf42d1b56b5",
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            };;
            jest.spyOn(mocksCommentsService, 'createComment').mockImplementation(() => Promise.resolve(comment));
            const result = await commentsResover.createComment(newComment);
            expect(result).toEqual(comment);
        });
    });

});