import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class TodoInput{
    @Field()
    userId:string

    @Field(type => String)
    title:string

    @Field(type => Boolean)
    completed:boolean
}

@ArgsType()
export class TodoFilter{
    @Field(type=> String , {nullable:true})
    _id:string
    
    @Field(type=> String , {nullable:true})
    userId:string

    @Field(type => Boolean , {nullable:true})
    completed:boolean
}