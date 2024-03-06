import { Field, ObjectType } from "@nestjs/graphql";
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class Album{
    @Field(type => String)
    _id:string
    
    @Field(type => String)
    @Prop()
    userId:string

    @Field(type => String)
    @Prop()
    title:string
}

export const albumSchema = SchemaFactory.createForClass(Album);
export const ALBUM_MODEL = 'ALBUM'
export const albumModelModule = MongooseModule.forFeature([{
    name:ALBUM_MODEL , schema:albumSchema
}])