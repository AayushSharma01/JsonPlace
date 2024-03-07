import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './todos.model';
import { TodoFilter, TodoInput } from './dto/todo.input';

@Resolver()
export class TodosResolver {
    constructor(private todosSerice:TodosService){}

    @Query(returns => Todo)
    async getTodo(@Args('_id')_id:string):Promise<Todo>{
        return await this.todosSerice.getTodo(_id);
    }

    @Query(returns => [Todo])
    async getTodos(@Args()todoFilter:TodoFilter):Promise<Todo[]>{
        return await this.todosSerice.getTodos(todoFilter);
    }

    @Mutation(returns => Todo)
    async createTodo(@Args('todoInput')todoInput :TodoInput):Promise<Todo>{
        return await this.todosSerice.createTodo(todoInput);
    }
}
