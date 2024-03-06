import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class PhotoInput{
    @Field(type => String)
    albumId:string

    @Field(type => String)
    title:string

    @Field(type => String)
    url:string

    @Field(type => String)
    thumbnailUrl:string
}

@ArgsType()
export class PhotoFillter{
    @Field(type => String , {nullable:true})
    _id:string
    
    @Field(type => String , {nullable:true})
    albumId:string

    @Field(type => String , {nullable:true})
    title:string

    @Field(type => String , {nullable:true})
    url:string

    @Field(type => String , {nullable:true})
    thumbnailUrl:string

}