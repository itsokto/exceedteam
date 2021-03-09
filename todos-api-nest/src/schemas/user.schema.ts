import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Todo } from "./todo.schema";
import * as mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId;
  name: String;
  password: String;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Todo.name }] })
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);