
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UserFilter, UserInput } from './dto/users.input';
import { UseGuards } from '@nestjs/common';
import { AuthGaurd } from 'src/guard/auth.gaurd';
import { Role } from 'src/decorators/roles.decorator';


@Resolver('User')
export class UsersResolver {
    constructor(private usersService:UsersService){}

    @Role('user')
    @Query(returns => User)
    async getUser(@Args('_id')_id:string):Promise<User>{
        return await this.usersService.getUser(_id);
    }

    @Role('user')
    @UseGuards(AuthGaurd)
    @Query(returns => [User])
    async getUsers(@Args()userfilter:UserFilter):Promise<User[]>{
        return await this.usersService.getUsers(userfilter);
    }

    @Role('admin')
    @UseGuards(AuthGaurd)
    @Mutation(returns => User )
    async createUser(@Args('userInput')userInput:UserInput):Promise<User>{
        return this.usersService.createUser(userInput);
    }
}
