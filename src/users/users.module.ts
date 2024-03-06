import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserModelModule } from './usersmodel';

@Module({
  imports:[UserModelModule],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
