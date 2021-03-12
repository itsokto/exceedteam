import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "./user.schema";
import * as mongoose from "mongoose";

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  id: string;
  title: string;
  isDone: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);