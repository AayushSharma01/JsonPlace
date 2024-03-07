import { Test, TestingModule } from "@nestjs/testing"
import { TodosService } from "./todos.service"
import { getModelToken } from "@nestjs/mongoose"
import { TODO_MODEL, Todo } from "./todos.model"
import mongoose, { Model } from "mongoose"
import { BadRequestException, NotFoundException } from "@nestjs/common"

describe('TodosService' ,()=>{
    let todosService:TodosService
    let model:Model<Todo>

    const todo = {
        _id: "65e6ece74feb4c1da881f356",
        userId: "65e6d57eef6a588135464228",
        title: "delectus aut autem",
        completed: false
      }

    const mockTodoModel = {
        findById: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
    }

    beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                TodosService,
                {
                    provide:getModelToken(TODO_MODEL),
                    useValue: mockTodoModel
                }
            ]
        }).compile();

        todosService = module.get<TodosService>(TodosService);
        model = module.get<Model<Todo>>(getModelToken(TODO_MODEL));
    })

    describe('getTodo' , ()=>{
        it('should find Todo and return using findById' , async()=>{
            jest.spyOn(model , 'findById').mockResolvedValue(todo);
            const result = await todosService.getTodo(todo._id);
            expect(result).toEqual(todo);
        })

        it('should throw BadExpectionRequest if _id is invalid' , async()=>{
            const id = 'invalid-id';
            const isValidObjectIdMock = jest.spyOn(mongoose , 'isValidObjectId').mockReturnValue(false);
            await expect(todosService.getTodo(id)).rejects.toThrow(
                BadRequestException
            );
            isValidObjectIdMock.mockRestore();
        });

        it('should throw NotFoundExpection if given Id is not exists' , async ()=>{
            jest.spyOn(model , 'findById').mockResolvedValue(null);
            await expect(todosService.getTodo(todo._id)).rejects.toThrow(
                NotFoundException
            );
        })
    });

    describe('getTodos' , ()=>{
        it('should take todo properties as argument and return array of todo' , async ()=>{
            const todoFilter = {
                userId: "65e6d57eef6a588135464228",
            title: "delectus aut autem",
            completed: false
                 
            }
    
            const todos = [todo];
            jest.spyOn(model , 'find').mockResolvedValue(todos);
            const result = await todosService.getTodos(todoFilter);
            expect(result).toEqual(todos);

        })
        
    });

    describe('createTodo' , ()=>{
        it('should take todoInput and create new todo' , async ()=>{
            const newTodo = {
                userId: "65e6d57eef6a588135464228",
                title: "delectus aut autem",
                completed: false
            };

            jest.spyOn(model , 'create').mockResolvedValue(todo as any);
            const result = await todosService.createTodo(newTodo);
            expect(result).toEqual(todo);
        })
    })



})