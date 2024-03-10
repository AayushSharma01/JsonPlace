import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getModelToken } from "@nestjs/mongoose";
import { User, User_Model } from "./usersmodel";
import mongoose, { Model } from "mongoose";
import { BadRequestException, NotFoundException } from "@nestjs/common";


describe('UsersService', () => {
  let usersService: UsersService;
  let model: Model<User>;
  let mockUserModel = {
    findById: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  }

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

  const users = [user]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User_Model),
          useValue: mockUserModel
        }
      ]
    }).compile();
    usersService = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User_Model));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('getUser', () => {
    it('should find user and return a user by id', async () => {

      jest.spyOn(model, 'findById').mockResolvedValue(user);
      const result = await usersService.getUser(user._id);
      expect(result).toEqual(user);

    });

    it('should throw a BadRequestExpection if invaild ID is provided', async () => {
      const id = 'invild-id'
      const isValidObjectIdMock = jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(false);
      await expect(usersService.getUser(id)).rejects.toThrow(
        BadRequestException,
      )
      expect(isValidObjectIdMock).toHaveBeenCalledWith(id);
      isValidObjectIdMock.mockRestore();
    });
    it('should throw NotFoundException if book is not found', async () => {

      jest.spyOn(model, 'findById').mockResolvedValue(null);

      await expect(usersService.getUser(user._id)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('getUsers', () => {
    it('take parameter as agrument and return array of users', async () => {
      const userInput = {
        name: "Kurtis Weissnat",
        username: "Elwyn.Skiles",
        email: "Telly.Hoeger@billy.biz",
        phone: "210.067.6132",
        website: "elvis.io",
      }
      jest.spyOn(model, 'find').mockResolvedValue(users);
      const result = await usersService.getUsers(userInput);
      expect(result).toEqual(users);
    })
  });

  describe('creatUser', () => {
    it("should take userInput and return a userResponse", async () => {

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

      jest.spyOn(model, 'create').mockResolvedValue(user as any)
      const result = await usersService.createUser(newUser);
      expect(result).toEqual(user);

    });
  });

  



})