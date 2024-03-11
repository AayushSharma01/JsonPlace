import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './todos.model';
import { TodoFilter, TodoInput } from './dto/todo.input';
import { UseGuards } from '@nestjs/common';
import { AuthGaurd } from 'src/guard/auth.gaurd';
import { Role } from 'src/decorators/roles.decorator';

@Resolver()
export class TodosResolver {
    constructor(private todosSerice:TodosService){}

    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns => Todo)
    async getTodo(@Args('_id')_id:string):Promise<Todo>{
        return await this.todosSerice.getTodo(_id);
    }

    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns => [Todo])
    async getTodos(@Args()todoFilter:TodoFilter):Promise<Todo[]>{
        return await this.todosSerice.getTodos(todoFilter);
    }
    
    @Role('admin')
    @UseGuards(AuthGaurd)
    @Mutation(returns => Todo)
    async createTodo(@Args('todoInput')todoInput :TodoInput):Promise<Todo>{
        return await this.todosSerice.createTodo(todoInput);
    }
}
