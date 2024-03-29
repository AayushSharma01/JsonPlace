import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AlbumsModule } from './albums/albums.module';
import { PhotosModule } from './photos/photos.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import {join} from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile:join(process.cwd(), 'schema.graphql'),
      playground:true,
    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.DB),
    JwtModule.register({
      global:true,
      secret:process.env.JWT_SCRECT,
      signOptions: { expiresIn: '2d'}
    }),
    PostsModule,
    CommentsModule,
    AlbumsModule,
    PhotosModule,
    TodosModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
