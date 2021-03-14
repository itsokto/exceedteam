import { Injectable } from '@nestjs/common';
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Todo, TodoDocument } from "../schemas/todo.schema";
import { TodoDto } from "./models/todo.dto";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoDocument: Model<TodoDocument>,
              @InjectModel(User.name) private userDocument: Model<UserDocument>) {}

  async create(title: string, userId: string): Promise<Todo> {
    const userDoc = await this.userDocument.findById(userId).exec();
    const todoDoc = await this.todoDocument.create({
      title: title,
      isDone: false,
      user: userId,
    });

    await todoDoc.save();

    userDoc.todos.push(todoDoc);

    await userDoc.save();

    return todoDoc;
  }

  async find(userId: string): Promise<TodoDocument[]> {
    return this.todoDocument.find({ user: userId }).exec();
  }

  async getById(id: string, userId: string): Promise<TodoDocument> {
    return this.todoDocument.findOne({ _id: id, user: userId }).exec();
  };

  async update(id: string, todo: TodoDto, userId: string): Promise<TodoDocument> {
    return this.todoDocument.findOneAndUpdate({ _id: id, user: userId }, todo).exec();
  };

  async delete(id: string, userId: string): Promise<TodoDocument> {
    return this.todoDocument.findOneAndDelete({ _id: id, user: userId }).exec();
  };

  // Delete completed Todos from the database.
  async deleteCompleted(userId: string) {
    return this.todoDocument.deleteMany({ user: userId, isDone: true }).exec();
  };

  async toggleAll(toggle: boolean, userId: string) {
    return this.todoDocument.updateMany({ user: userId }, { $set: { isDone: toggle } }).exec();
  };
}
