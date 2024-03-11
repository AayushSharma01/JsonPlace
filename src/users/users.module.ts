import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserModelModule } from './users.model';

@Module({
  imports:[UserModelModule],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
