import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "./user.schema";
import * as mongoose from "mongoose";

export type CatDocument = Todo & Document;

@Schema()
export class Todo {
  title: String;
  isDone: Boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name})
  user: User;
}

export const CatSchema = SchemaFactory.createForClass(Todo);