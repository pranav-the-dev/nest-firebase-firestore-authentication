import { Body, Controller, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  constructor(private readonly TDService: TodoService) {}

  @Post('/createTodoFirebase')
  createTodoFirebase(@Body() todosCollection: any) {
    return this.TDService.createTodoFirebase(todosCollection);
  }
}
