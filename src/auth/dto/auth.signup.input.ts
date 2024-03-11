import { Field, InputType } from "@nestjs/graphql";
import { Role } from "../auth.user.model";

@InputType()
export class SignUpInput{
    @Field(type => String)
    name:string

    @Field(type=> String)
    email:string

    @Field(type=> String)
    password:string

    @Field(type=> Role)
    role:Role
}

@InputType()
export class SignInInput{
    @Field(type=> String)
    email:string

    @Field(type=> String)
    password:string
}