import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TODO_MODEL, Todo } from './todos.model';
import mongoose, { Model } from 'mongoose';
import { Args } from '@nestjs/graphql';
import { TodoFilter, TodoInput } from './dto/todo.input';

@Injectable()
export class TodosService {
    constructor(@InjectModel(TODO_MODEL) private todoModel: Model<Todo>) { }

    async getTodo(_id: string): Promise<Todo> {
        const isValidId = mongoose.isValidObjectId(_id);
        if (!isValidId) {
            throw new BadRequestException('please enter correct id');
        }
        const id = new mongoose.Types.ObjectId(_id);
        const result = await this.todoModel.findById(id);

        if (!result) throw new NotFoundException('Todo not found with given Id');

        return result;
    }

    async getTodos(todoFilter: TodoFilter): Promise<Todo[]> {
        return await this.todoModel.find(todoFilter);

    }

    async createTodo(@Args('todoInput') todoInput: TodoInput): Promise<Todo> {
        return await this.todoModel.create(todoInput);
    }
}
