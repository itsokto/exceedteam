import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "./user.schema";
import * as mongoose from "mongoose";
import { AutoMap } from "@automapper/classes";

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @AutoMap()
  id: string;

  @AutoMap()
  @Prop({ required: true })
  title: string;

  @AutoMap()
  @Prop()
  isDone: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User | mongoose.Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);