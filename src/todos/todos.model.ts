import { Field, ObjectType } from "@nestjs/graphql";
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class Todo{

    @Field(type=>String)
    _id:string
    
    @Field(type => String)
    @Prop()
    userId:string

    @Field(type => String)
    @Prop()
    title:string

    @Field(type => Boolean)
    @Prop()
    completed:boolean
}

export const todoSchema = SchemaFactory.createForClass(Todo);
export const TODO_MODEL = 'TODO'

export const TodoModelModule = MongooseModule.forFeature([{
    name:TODO_MODEL , schema:todoSchema
}])