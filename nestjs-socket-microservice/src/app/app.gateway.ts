import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {Get, Logger} from '@nestjs/common';
import {UserService} from "../User/user.service";

@WebSocketGateway(5000)
export class AppGateway {

  constructor(private userService: UserService) {
  }

  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() private server: any;

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
  //
  // afterInit(server: Server) {
  //   // this.logger.log('Init');
  // }

  /**
   * При разрыве соединения необходимо удалить устройства у пользователя
   * @param client
   */
  handleDisconnect(client: Socket) {
    // this.logger.log(`Client disconnected: ${client.id}`);
  }

  /**
   * Через запрос на соединение в заголовке передается токен
   * В дельнейшем токен проверяется на сервере. Если невалиден, то разрыв соединения
   * @param client
   * @param args
   */
  handleConnection(client: Socket, ...args: any[]) {
    this.userService.auth(client.handshake.headers.authorization, client)
  }

  /**
   * Отправка сообщения клиенту
   * @param data
   * @param client
   */
  sendMessage(data, client: Socket){
    this.server.emit('my_message', data);
  }
}
