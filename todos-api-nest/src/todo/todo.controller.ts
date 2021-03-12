import { Body, Controller, Delete, Get, Param, Patch, Put, Query, UseGuards } from '@nestjs/common';
import { TodoService } from "./todo.service";
import { TodoResponse } from "./todo.response";
import { Todo } from "../schemas/todo.schema";
import { User } from "../decorators/user.decorator";
import { SignUser } from "../models/SignUser";
import { AuthGuard } from "@nestjs/passport";

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Put()
  async create(@Query('title') title, @User() user: SignUser): Promise<TodoResponse<Todo>> {
    const todoDoc = await this.todoService.create(title, user.id);

    return !todoDoc ?
      { ok: false, message: "Cannot create todo" } :
      { ok: true, payload: todoDoc }
  };

  @Get()
  async getAll(@User() user: SignUser): Promise<TodoResponse<Todo[]>> {
    const todos = await this.todoService.getAll(user.id)

    return !todos ?
      { ok: false, message: "Not found Todos" } :
      { ok: true, payload: todos }
  };

  @Get(':id')
  async findById(@Param('id') id: string, @User() user: SignUser): Promise<TodoResponse<Todo>> {
    const todoDoc = await this.todoService.getById(id, user.id);

    return !todoDoc ?
      { ok: false, message: "Not found Todo with id " + id } :
      { ok: true, payload: todoDoc }
  };

  @Put(':id')
  async update(@Param('id') id: string, @Body() todo: Todo, @User() user: SignUser): Promise<TodoResponse<Todo>> {
    const todoDoc = await this.todoService.update(todo, user.id)

    return !todoDoc ?
      { ok: false, message: `Cannot update Todo with id=${id}.` } :
      { ok: true, payload: todoDoc }
  };

  @Delete(':id')
  async delete(@Param('id') id: string, @User() user: SignUser): Promise<TodoResponse<Todo>> {
    const todoDoc = await this.todoService.delete(id, user.id)

    return !todoDoc ?
      { ok: false, message: `Cannot delete Todo with id=${id}.` } :
      { ok: true, payload: todoDoc }
  };

  @Delete()
  async deleteCompleted(@User() user: SignUser): Promise<TodoResponse<any>> {
    const result = await this.todoService.deleteCompleted(user.id);

    return { ok: true, payload: result };
  };

  @Patch()
  async toggleAll(@Query('toggle') toggle: boolean, @User() user: SignUser): Promise<TodoResponse<any>> {
    const result = await this.todoService.toggleAll(toggle, user.id)

    return { ok: true, payload: result };
  };
}
