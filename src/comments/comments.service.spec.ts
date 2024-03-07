import mongoose, { Model } from "mongoose"
import { CommentsService } from "./comments.service"
import { Test, TestingModule } from "@nestjs/testing"
import { getModelToken } from "@nestjs/mongoose"
import { COMMENT_MODEL } from "./comments.model"
import { BadRequestException, NotFoundException } from "@nestjs/common"

 
describe('CommentsService' ,()=>{
    let commentsService:CommentsService
    let model:Model<Comment>

    const comment =  {
        _id: "65e7edc74c8b0187e16697e3",
        postId: "65e7db8090db2bf42d1b56b5",
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      }

    const mockCommentModel = {
        findById: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
    }

    beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                CommentsService,
                {
                    provide:getModelToken(COMMENT_MODEL),
                    useValue: mockCommentModel
                }
            ]
        }).compile();

        commentsService = module.get<CommentsService>(CommentsService);
        model = module.get<Model<Comment>>(getModelToken(COMMENT_MODEL));
    })

    describe('getComment' , ()=>{
        it('should find Comment and return using findById' , async()=>{
            jest.spyOn(model , 'findById').mockResolvedValue(comment);
            const result = await commentsService.getComment(comment._id);
            expect(result).toEqual(comment);
        })

        it('should throw BadExpectionRequest if _id is invalid' , async()=>{
            const id = 'invalid-id';
            const isValidObjectIdMock = jest.spyOn(mongoose , 'isValidObjectId').mockReturnValue(false);
            await expect(commentsService.getComment(id)).rejects.toThrow(
                BadRequestException
            );
            isValidObjectIdMock.mockRestore();
        });

        it('should throw NotFoundExpection if given Id is not exists' , async ()=>{
            jest.spyOn(model , 'findById').mockResolvedValue(null);
            await expect(commentsService.getComment(comment._id)).rejects.toThrow(
                NotFoundException
            );
        })
    });

    describe('getComments' , ()=>{
        it('should take comment properties as argument and return array of comment' , async ()=>{
            const commentFilter = {
                postId: "65e7db8090db2bf42d1b56b5",
                name: "id labore ex et quam laborum",
                email: "Eliseo@gardner.biz",
                body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            }
    
            const comments = [comment];
            jest.spyOn(model , 'find').mockResolvedValue(comments);
            const result = await commentsService.getComments(commentFilter);
            expect(result).toEqual(comments);
        })
        
    });

    describe('createComment' , ()=>{
        it('should take commentInput and create new Comment' , async ()=>{
            const newComment = {
                postId: "65e7db8090db2bf42d1b56b5",
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            };

            jest.spyOn(model , 'create').mockResolvedValue(comment as any);
            const result = await commentsService.createComment(newComment);
            expect(result).toEqual(comment);
        })
    })

})