import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthUserModelModule } from './auth.user.model';

@Module({
  imports:[AuthUserModelModule],
  providers: [AuthService, AuthResolver]
})
export class AuthModule {}
