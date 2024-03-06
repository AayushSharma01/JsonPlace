import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@ObjectType()
class Geo{
    @Field(type => String)
    lat:string

    @Field(type => String)
    lng:string
}

@ObjectType()
class Address{
    @Field(type => String)
    street:string

    @Field(type => String)
    suite:string

    @Field(type => String)
    city:string

    @Field(type => String)
    zipcode:string

    @Field(type => Geo)
    geo:Geo  
}
@ObjectType()
export class Company{
    @Field(type=>String)
    name:string
 
    @Field(type => String)
    catchPhrase:string
    
    @Field(type => String)
    bs:string
}

@ObjectType()
@Schema()
export class User{
    @Field(type => String)
    _id:string
    
    @Field(type => String)
    @Prop()
    name:string

    @Field(type => String)
    @Prop()
    username:string

    @Field(type => String)
    @Prop()
    email:string

    @Field(type => Address)
    @Prop()
    address:Address

    @Field(type=>String)
    @Prop()
    phone:string

    @Field(type => String)
    @Prop()
    website:string

    @Field(type => Company)
    @Prop()
    company:Company  
}


export const userSchema = SchemaFactory.createForClass(User);
export const User_Model = 'User'
export const UserModelModule = MongooseModule.forFeature([{
    name:User_Model , schema:userSchema
}]);