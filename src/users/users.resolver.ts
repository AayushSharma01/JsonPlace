
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './usersmodel';
import { UsersService } from './users.service';
import { UserFilter, UserInput } from './dto/users.input';

@Resolver('User')
export class UsersResolver {
    constructor(private usersService:UsersService){}

    @Query(returns => [User])
    async getUsers(@Args()userfilter:UserFilter):Promise<User[]>{
        return await this.usersService.getUsers(userfilter);
    }

    @Mutation(returns => User )
    async createUser(@Args('userInput')userInput:UserInput):Promise<User>{
        return this.usersService.createUser(userInput);
    }
}
