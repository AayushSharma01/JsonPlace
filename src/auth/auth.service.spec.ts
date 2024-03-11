import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AUTH_USER, AuthUser } from './auth.user.model';
import { getModelToken } from '@nestjs/mongoose';
import { Role } from './auth.user.model';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService:JwtService;
  let model:Model<AuthUser>;

  const mockJwtService = {
    signAsync:jest.fn()
  }
  const mockAuthModel = {
    findOne:jest.fn(),
    create:jest.fn(),

  };

  const newUser = {
      name:'aayush' , 
      email:"aayush@123" , 
      password:"aayush123" , 
      role:Role.ADMIN};


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService , 
        {
          provide:JwtService,
          useValue:mockJwtService
        },
        {
          provide:getModelToken(AUTH_USER),
          useValue:mockAuthModel
        }
       ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    model = module.get<Model<AuthUser>>(getModelToken(AUTH_USER));
  });


   describe('signUp' , ()=>{
    it('should take new user and made signUp' , async()=>{
        const hashPassword = '$2b$10$RgcPFuGgcV/IxxD0rUXre.DJ5TL6dCd1nqa3NuDjNNiN6UTlgdrpm';
        const user = {
          name:'aayush' , 
          email:"aayush@123" ,
          password:hashPassword,
          role:Role.ADMIN
        }
        jest.spyOn(bcrypt , 'hash').mockImplementation(()=> Promise.resolve(hashPassword));
        jest.spyOn(model , 'create').mockImplementation(()=>Promise.resolve(user as any));
        const result = await authService.signUp(newUser);
        expect(result).toEqual(user);
    });

    it('check user is allready existing'  , async()=>{
      jest.spyOn(model , 'findOne').mockResolvedValue({name:'aayush' , email:'aayush@123' , role:'user'});
      await expect(authService.signUp(newUser)).rejects.toThrow(
        BadRequestException
      );
    });
   });

   describe('signIn' , ()=>{
      it('taken signIn input and return signResponse' , async ()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWVlNzU0NGNjZDA5MDNjN2ZjMWRiMzMiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMDEyNzA0OCwiZXhwIjoxNzEwMjk5ODQ4fQ.c48fJIgD7p7dZ--JK7rn0wwDyIRWsfRZ2nPjQLPJCus';
        const signInResponse = {
          jwtToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWVlNzU0NGNjZDA5MDNjN2ZjMWRiMzMiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMDEyNzA0OCwiZXhwIjoxNzEwMjk5ODQ4fQ.c48fJIgD7p7dZ--JK7rn0wwDyIRWsfRZ2nPjQLPJCus'
        }
        jest.spyOn(jwtService  , 'signAsync').mockImplementation(()=> Promise.resolve(token));
        jest.spyOn(model  , 'findOne').mockResolvedValue({name:'piyush' , email:'piyush123' , password:'$2b$10$RgcPFuGgcV/IxxD0rUXre.DJ5TL6dCd1nqa3NuDjNNiN6UTlgdrpm' , role:Role.USER});
        jest.spyOn(bcrypt , 'compare').mockImplementation(()=> Promise.resolve(true));

        const result = await authService.signIn({email:'piyush@123' , password:'piyush123'});
        
        expect(result).toEqual(signInResponse);
      });

      it('should compare password' , async()=>{
           const compareMock = jest.spyOn(bcrypt , 'compare').mockImplementation(()=> Promise.resolve(false));
           await expect(authService.signIn({email:'piyush@gmail.com' , password:'piyush123'})).rejects.toThrow(
            BadRequestException
           );
           compareMock.mockRestore();
      });

      it('check user is existing' , async()=>{
          const findOneMock = jest.spyOn(model , 'findOne').mockResolvedValue(null);
          await expect(authService.signIn({email:'piyush@123' , password:'piyush123'})).rejects.toThrow(
            NotFoundException
          )
          findOneMock.mockRestore();
      })
     
   })

});
