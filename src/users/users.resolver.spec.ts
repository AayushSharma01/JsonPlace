import { Test, TestingModule } from "@nestjs/testing"
import { UsersResolver } from "./users.resolver"
import { UsersService } from "./users.service"
import { User } from "./users.model"

describe('UsersResolver' , ()=>{
    let mockUsersService:UsersService;
    let usersResolver:UsersResolver;
    const user: User = {
        _id: "65e6d57eef6a588135464228",
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets"
        }
      }

      const MockUsersService = {
             getUser:jest.fn(),
             getUsers:jest.fn(),
             createUser:jest.fn()
        }

    beforeEach(async ()=>{ 
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                UsersResolver,
                {
                    provide:UsersService,
                    useValue:MockUsersService
                }
            ]
        }).compile();
        usersResolver = module.get<UsersResolver>(UsersResolver);
        mockUsersService = module.get<UsersService>(UsersService);
    });

    describe('getUser' , ()=>{
        it('should take _id and return user that matches _id' , async()=>{
            const _id = "65e6d57eef6a588135464228";
            jest.spyOn(mockUsersService , 'getUser').mockImplementation(()=>Promise.resolve(user));
            const result = await usersResolver.getUser(_id);
            expect(result).toEqual(user);
        })
    })
    describe('getUsers' , ()=>{
        it('should take userFilter and return array of user' , async()=>{
            const userInput = {
                name: "Kurtis Weissnat",
                username: "Elwyn.Skiles",
                email: "Telly.Hoeger@billy.biz",
                phone: "210.067.6132",
                website: "elvis.io",
              };
            jest.spyOn(mockUsersService , 'getUsers').mockImplementation(()=>Promise.resolve([user]));
            const result = await usersResolver.getUsers(userInput);
            expect(result).toEqual([user]);
        });
  
    })

    describe('createUser' , ()=>{
        it('should take newUser and createUser' , async()=>{
            const newUser = {
                name: "Kurtis Weissnat",
                username: "Elwyn.Skiles",
                email: "Telly.Hoeger@billy.biz",
                address: {
                  street: "Rex Trail",
                  suite: "Suite 280",
                  city: "Howemouth",
                  zipcode: "58804-1099",
                  geo: {
                    lat: "24.8918",
                    lng: "21.8984"
                  }
                },
                phone: "210.067.6132",
                website: "elvis.io",
                company: {
                  name: "Johns Group",
                  catchPhrase: "Configurable multimedia task-force",
                  bs: "generate enterprise e-tailers"
                }
              }
            jest.spyOn(mockUsersService , 'createUser').mockImplementation(()=>Promise.resolve(user));
            const result = await usersResolver.createUser(newUser);
            expect(result).toEqual(user);
        });

    })
})