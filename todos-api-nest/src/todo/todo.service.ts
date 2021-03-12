import { Injectable } from '@nestjs/common';
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Todo, TodoDocument } from "../schemas/todo.schema";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoDocument: Model<TodoDocument>,
              @InjectModel(User.name) private userDocument: Model<UserDocument>) {}

  async create(title: string, userId: string): Promise<Todo> {
    const userDoc = await this.userDocument.findById(userId);
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

  async getAll(userId: string): Promise<TodoDocument[]> {
    return this.todoDocument.find({ filter: { "user._id": userId } });
  }

  async getById(id: string, userId: string): Promise<TodoDocument> {
    return this.todoDocument.findOne({ _id: id, "user._id": userId });
  };

  async update(todo: Todo, userId: string): Promise<TodoDocument> {
    return this.todoDocument.findOneAndUpdate({ _id: todo.id, "user._id": userId }, todo);
  };

  async delete(id: string, userId: string): Promise<TodoDocument> {
    return this.todoDocument.findOneAndDelete({ _id: id, "user._id": userId });
  };

  // Delete completed Todos from the database.
  async deleteCompleted(userId: string) {
    return this.todoDocument.deleteMany({ "user._id": userId, isDone: true });
  };

  async toggleAll(toggle: boolean, userId: string) {
    return this.todoDocument.updateMany({ "user._id": userId }, { $set: { isDone: toggle } });
  };
}
