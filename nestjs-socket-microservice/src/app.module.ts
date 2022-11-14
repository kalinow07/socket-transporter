import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import {UserService} from "./User/user.service";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.development.env'
  })],
  controllers: [AppController],
  providers: [AppService, AppGateway, UserService],
})
export class AppModule {}
