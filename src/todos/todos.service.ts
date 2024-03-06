import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TODO_MODEL, Todo } from './todos.model';
import mongoose, { Model } from 'mongoose';
import { Args } from '@nestjs/graphql';
import { TodoFilter, TodoInput } from './dto/todo.input';

@Injectable()
export class TodosService {
    constructor(@InjectModel(TODO_MODEL)private todoModel:Model<Todo>){}

    async getTodos(todoFilter:TodoFilter):Promise<Todo[]>{
        if(todoFilter._id){
            const id = new mongoose.Types.ObjectId(todoFilter._id);
            return await this.todoModel.find({_id:id});
        }else{
            return await this.todoModel.find(todoFilter);

        }
        
    }

    async createTodo(@Args('todoInput')todoInput:TodoInput):Promise<Todo>{
        const res = await this.todoModel.create(todoInput);
        return await res.save();
    }
}
