import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum Role {
     USER = 'user',
     ADMIN = 'admin'
}

registerEnumType(Role, { name: 'Role' });

@ObjectType()
@Schema()
export class AuthUser{
    @Field(type => String)
    @Prop()
    name:string

    @Field(type => String)
    @Prop()
    email:string

    @Field(type => String)
    @Prop()
    password:string

    @Field(type => Role)
    @Prop()
    role:Role 
}

@ObjectType()
export class SignInResponse{
    @Field(type => String)
    jwtToken:string
}

export const authUserSchema = SchemaFactory.createForClass(AuthUser);
export const AUTH_USER = 'AUTHUSER';
export const AuthUserModelModule = MongooseModule.forFeature([
    {name:AUTH_USER , schema:authUserSchema}
]);
