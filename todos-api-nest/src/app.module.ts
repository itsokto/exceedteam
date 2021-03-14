import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { TodoModule } from "./todo/todo.module";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { UserProfile } from "./profiles/user.profile";

const dbConfig = require('./configs/db.config')

@Module({
  imports: [
    MongooseModule.forRoot(dbConfig.url),
    AuthModule,
    TodoModule,
    AutomapperModule.forRoot({
      options: [{ name: 'default', pluginInitializer: classes }],
      singular: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserProfile],
})
export class AppModule {}
