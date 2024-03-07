import { Field, ObjectType } from "@nestjs/graphql";
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class Photo{

    @Field(type => String)
    _id:string
    
    @Field(type => String)
    @Prop()
    albumId:string

    @Field(type => String)
    @Prop()
    title:string

    @Field(type => String)
    @Prop()
    url:string

    @Field(type => String)
    @Prop()
    thumbnailUrl:string
}

export const photoSchema = SchemaFactory.createForClass(Photo);
export const PHOTO_MODEL = 'PHOTO'
export const photoModelModule = MongooseModule.forFeature([{
    name:PHOTO_MODEL , schema:photoSchema
}])