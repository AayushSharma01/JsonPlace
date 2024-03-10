import { Test, TestingModule } from "@nestjs/testing";
import { Todo } from "./todos.model";
import { TodosResolver } from "./todos.resolver";
import { TodosService } from "./todos.service";



describe('UsersResolver', () => {
    let mockTodosService: TodosService;
    let todosResolver: TodosResolver;
    const todo: Todo = {
        _id: "65e6ece74feb4c1da881f356",
        userId: "65e6d57eef6a588135464228",
        title: "delectus aut autem",
        completed: false
    }
    const MockTodosService = {
        getTodo: jest.fn(),
        getTodos: jest.fn(),
        createTodo: jest.fn()
    }
    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodosResolver,
                {
                    provide: TodosService,
                    useValue: MockTodosService
                }
            ]
        }).compile();
        todosResolver = module.get<TodosResolver>(TodosResolver);
        mockTodosService = module.get<TodosService>(TodosService);
    });

    describe('getTodo', () => {
        it('should take _id and return todothat matches _id', async () => {
            const _id = "65e6ece74feb4c1da881f356";
            jest.spyOn(mockTodosService, 'getTodo').mockImplementation(() => Promise.resolve(todo));
            const result = await todosResolver.getTodo(_id);
            expect(result).toEqual(todo);
        })
    });
    describe('getTodos', () => {
        it('should take todoFilter and return array of todo', async () => {
            const todoFilter = {
                userId: "65e6d57eef6a588135464228",
                title: "delectus aut autem",
                completed: false

            };
            jest.spyOn(mockTodosService, 'getTodos').mockImplementation(() => Promise.resolve([todo]));
            const result = await todosResolver.getTodos(todoFilter);
            expect(result).toEqual([todo]);
        });

    });

    describe('createTodo', () => {
        it('should take newTodo and createTodo', async () => {
            const newTodo = {
                userId: "65e6d57eef6a588135464228",
                title: "delectus aut autem",
                completed: false
            }
            jest.spyOn(mockTodosService, 'createTodo').mockImplementation(() => Promise.resolve(todo));
            const result = await todosResolver.createTodo(newTodo);
            expect(result).toEqual(todo);
        });

    });
});