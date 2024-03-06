import { Field, ObjectType } from "@nestjs/graphql";
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class Post{
    @Field(type => String)
    _id:string

    @Field(type => String)
    @Prop()
    userId:string

    @Field(type => String)
    @Prop()
    title:string

    @Field(type => String)
    @Prop()
    body:string
}

export const postSchema = SchemaFactory.createForClass(Post);
export const POST_MODEL = 'POST'
export const postModelModule = MongooseModule.forFeature([{
    name:POST_MODEL , schema:postSchema
}])