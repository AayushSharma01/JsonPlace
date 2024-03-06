import { Field, ObjectType } from "@nestjs/graphql";
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class Comment{
    @Field(type => String)
    _id:string

    @Field(type => String)
    @Prop()
    postId:string

    @Field(type => String)
    @Prop()
    name:string

    @Field(type => String)
    @Prop()
    email:string

    @Field(type => String)
    @Prop()
    body:string
}

export const commentSchema = SchemaFactory.createForClass(Comment);
export const COMMENT_MODEL = 'COMMENT'
export const commentModelModule = MongooseModule.forFeature([{
    name:COMMENT_MODEL , schema:commentSchema
}])