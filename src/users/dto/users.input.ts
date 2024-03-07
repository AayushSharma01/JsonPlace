import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
class GeoInput{
    @Field(type => String)
    lat:string

    @Field(type => String)
    lng:string
}

@InputType()
class AddressInput{
    @Field(type => String)
    street:string

    @Field(type => String)
    suite:string

    @Field(type => String)
    city:string

    @Field(type => String)
    zipcode:string

    @Field(type => GeoInput)
    geo:GeoInput
}
@InputType()
export class CompanyInput{
    @Field(type=>String)
    name:string
 
    @Field(type => String)
    catchPhrase:string
    
    @Field(type => String)
    bs:string
}
@InputType()
export class UserInput{
    @Field(type => String)
    name:string

    @Field(type => String)
    username:string

    @Field(type => String)
    email:string

    @Field(type => AddressInput)
    address:AddressInput

    @Field(type => String)
    phone:string

    @Field(type => String)
    website:string

    @Field(type => CompanyInput)
    company:CompanyInput
}

@ArgsType()
export class UserFilter{
    @Field(type => String , {nullable:true})
    name:String
   
    @Field(type => String , {nullable:true})
    username:String

    @Field(type => String , {nullable:true})
    email:String

    @Field(type => String , {nullable:true})
    phone:String

    @Field(type => String , {nullable:true})
    website:String

}