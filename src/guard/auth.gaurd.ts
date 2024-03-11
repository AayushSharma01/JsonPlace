import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { platform } from "os";
import { Role } from "src/decorators/roles.decorator";

@Injectable()
export class AuthGaurd implements CanActivate{
    constructor( private jwtService:JwtService,
       private reflector:Reflector){}

    async canActivate(context: ExecutionContext):  Promise<boolean>{

        const ctx = GqlExecutionContext.create(context);
        const role = await this.reflector.get(Role , ctx.getHandler());
        const request = ctx.getContext().req;
        const token = this.extractTokenFromHeader(request);
        
        if (!token) {
          throw new UnauthorizedException('first login to acess this route');
        }

        const payload = await this.jwtService.verifyAsync(token , {
          secret:process.env.JWT_SCRECT
        });
        console.log(payload);
         
        if(role == 'admin' && payload.role != 'admin'){
          throw new UnauthorizedException('only admin can access this route');
        }

        return true;

    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}