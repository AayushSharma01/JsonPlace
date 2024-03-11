import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser, SignInResponse } from './auth.user.model';
import { SignInInput, SignUpInput } from './dto/auth.signup.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver{
    constructor(private authService:AuthService){}
    
    @Mutation(returns => AuthUser)
    async signUp(@Args('signUpInput')signUpInput:SignUpInput):Promise<AuthUser>{
         return await this.authService.signUp(signUpInput);
    }

    @Mutation(returns => SignInResponse)
    async signIn(@Args('signInInput')signInInput:SignInInput):Promise<SignInResponse>{
        return this.authService.signIn(signInInput);
    }

}
