import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { TodoModule } from "./todo/todo.module";
import { User, UserSchema } from "./schemas/user.schema";
import { Todo, TodoSchema } from "./schemas/todo.schema";

const dbConfig = require('./configs/db.config')

@Module({
  imports: [MongooseModule.forRoot(dbConfig.url), AuthModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
