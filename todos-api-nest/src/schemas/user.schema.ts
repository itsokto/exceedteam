import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Todo } from "./todo.schema";
import * as mongoose from "mongoose";
import { AutoMap } from "@automapper/classes";

export type UserDocument = User & Document;

@Schema()
export class User {
  @AutoMap()
  id: string;

  @AutoMap()
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }] })
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);