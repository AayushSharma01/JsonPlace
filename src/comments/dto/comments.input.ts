import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class CommentInput{
    @Field(type => String)
    postId:string

    @Field(type => String)
    name:string

    @Field(type => String)
    email:string

    @Field(type => String)
    body:string
}

@ArgsType()
export class CommentFilter{
    @Field(type=> String , {nullable:true})
    _id:string

    @Field(type => String , {nullable:true})
    postId:string

    @Field(type => String , {nullable:true})
    name:string

    @Field(type => String , {nullable:true})
    email:string

    @Field(type => String , {nullable:true})
    body:string
}