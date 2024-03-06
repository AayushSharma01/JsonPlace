import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class PostInput{
   @Field(type => String)
   userId:string

   @Field(type => String)
   title:string

   @Field(type => String)
   body:string
}

@ArgsType()
export class PostFilter{
   @Field(type=>String , {nullable:true})
   _id:string

   @Field(type=>String , {nullable:true})
   userId:string

   @Field(type=>String , {nullable:true})
   title:string

   @Field(type=>String , {nullable:true})
   body:string
}