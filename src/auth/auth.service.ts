import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AUTH_USER, AuthUser, SignInResponse } from './auth.user.model';
import { Model } from 'mongoose';
import { SignInInput, SignUpInput } from './dto/auth.signup.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(AUTH_USER) private authUserModel: Model<AuthUser>,
       private jwtService:JwtService) { }

    async signUp(signUpInput: SignUpInput): Promise<AuthUser> {
        const res = await this.authUserModel.findOne({ email: signUpInput.email });
        if (res) throw new BadRequestException('enterd email all ready exist...');

        const hashPassword = await bcrypt.hash(signUpInput.password, 10);
        signUpInput.password = hashPassword;
        return await this.authUserModel.create(signUpInput);
    }

    async signIn(signInInput: SignInInput): Promise<SignInResponse> {
        const savedUser = await this.authUserModel.findOne({ email: signInInput.email });
        if (!savedUser) throw new NotFoundException('enter user not exist');
        const checkPassword = await bcrypt.compare(signInInput.password, savedUser.password);
        console.log(checkPassword);
        if (!checkPassword) throw new BadRequestException('entered correct password');
       
        const payload = { sub: savedUser._id , role:savedUser.role};
        const token = await this.jwtService.signAsync(payload);
        return {
            jwtToken:token
        }


    }
}
