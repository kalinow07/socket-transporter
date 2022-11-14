import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Ctx, EventPattern, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  /**
   * Точка входа сообщений от RabbitMQ
   * @param data
   * @param context
   */
  @EventPattern()
  getMessageFromRabbitMQ(@Payload() data: any, @Ctx() context: RmqContext): void {
    this.appService.sentMessage(data)
  }

}
