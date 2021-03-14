import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TodoService } from "./todo.service";
import { TodoResponse } from "./todo.response";
import { Todo } from "../schemas/todo.schema";
import { User } from "../decorators/user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { JwtUser } from "../auth/models/jwt.user";
import { TodoDto } from "./models/todo.dto";

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Query('title') title, @User() user: JwtUser): Promise<TodoResponse<Todo>> {
    const todoDoc = await this.todoService.create(title, user.id);

    return !todoDoc ?
      { ok: false, message: "Cannot create todo" } :
      { ok: true, payload: todoDoc }
  };

  @Get()
  async find(@User() user: JwtUser): Promise<TodoResponse<Todo[]>> {
    const todos = await this.todoService.find(user.id)

    return !todos ?
      { ok: false, message: "Not found Todos" } :
      { ok: true, payload: todos }
  };

  @Get(':id')
  async findById(@Param('id') id: string, @User() user: JwtUser): Promise<TodoResponse<Todo>> {
    const todoDoc = await this.todoService.getById(id, user.id);

    return !todoDoc ?
      { ok: false, message: "Not found Todo with id " + id } :
      { ok: true, payload: todoDoc }
  };

  @Put(':id')
  async update(@Param('id') id: string, @Body() todo: TodoDto, @User() user: JwtUser): Promise<TodoResponse<Todo>> {
    const todoDoc = await this.todoService.update(id, todo, user.id)

    return !todoDoc ?
      { ok: false, message: `Cannot update Todo with id=${id}.` } :
      { ok: true, payload: todoDoc }
  };

  @Delete(':id')
  async delete(@Param('id') id: string, @User() user: JwtUser): Promise<TodoResponse<Todo>> {
    const todoDoc = await this.todoService.delete(id, user.id)

    return !todoDoc ?
      { ok: false, message: `Cannot delete Todo with id=${id}.` } :
      { ok: true, payload: todoDoc }
  };

  @Delete()
  async deleteCompleted(@User() user: JwtUser): Promise<TodoResponse<any>> {
    const result = await this.todoService.deleteCompleted(user.id);

    return { ok: true, payload: result };
  };

  @Patch()
  async toggleAll(@Query('toggle') toggle: boolean, @User() user: JwtUser): Promise<TodoResponse<any>> {
    const result = await this.todoService.toggleAll(toggle, user.id)

    return { ok: true, payload: result };
  };
}
