import { Injectable } from '@nestjs/common';
import {AppGateway} from "./app/app.gateway";
import {UserService} from "./User/user.service";
import {User} from "./User/User";
import {Socket} from "socket.io";

@Injectable()
export class AppService {

    constructor(private appGateway: AppGateway, private userService: UserService) {
    }

    /**
     * Отправка сообщения каждому устройству пользователя
     * @param data
     */

    sentMessage(data){
        data.members.forEach((memberId: number) => {
            const key = memberId.toString();
            if(key in this.userService.users){
                console.log("Отправка сообщения для пользователя  " + key)
                let user: User = this.userService.users[key];
                user.clients.forEach((client: Socket) => {
                    console.log("Отправка сообщения для устройства " + client.id)
                    data['i'] = user.id
                    this.appGateway.sendMessage(data, client)
                })
            }
        })
    }
}
