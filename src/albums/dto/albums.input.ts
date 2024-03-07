import { ArgsType, Field, InputType } from "@nestjs/graphql"

@InputType()
export class AlbumInput{
    @Field(type => String)
    userId:string

    @Field(type => String)
    title:string
}

@ArgsType()
export class AlbumFilter{
    @Field(type => String , {nullable:true})
    userId:string

    @Field(type => String , {nullable:true})
    title:string
}