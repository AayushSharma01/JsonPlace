import { Module } from '@nestjs/common';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';
import { TodoModelModule } from './todos.model';

@Module({
  imports:[TodoModelModule],
  providers: [TodosResolver, TodosService]
})
export class TodosModule {}
