import { Injectable } from '@nestjs/common';
import {User} from "./User";
import {Socket} from "socket.io";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class UserService {

    /**
     * Здесь сохраняются все подключенные пользователи. Ключ - идентификатор пользователя. Значение - модель пользователя.
     */
    public users = Object()


    constructor(private config: ConfigService) {
    }

    /**
     * Создание пользователя
     * @param id
     * @param client
     * @private
     */
    private createUser(id: number, client: Socket): User {
        return new User(id, client)
    }


    /**
     * Добавление пользователя в список подключенных пользователей
     * @param userId
     * @param client
     * @private
     */
    private addUser(userId: number, client: Socket): void {

        let user = this.createUser(userId, client)

        if(!this.hasUser(user)){
            this.users[userId] = user
        }
    }

    /**
     * Имеется ли в списке пользователь
     * @param user
     * @private
     */
    private hasUser(user: User): Boolean {
        return Boolean(this.users[user.id])
    }


    /**
     * Получить пользователя по идентификатору
     * @param id
     * @private
     */
    private getUser(id): User {
        return this.users[id]
    }

    /**
     * Удалить пользователя из списка
     * @param user
     * @private
     */
    private removeUser(user: User){
        delete this.users[user.id];
    }

    /**
     * Получить количество пользователей в списке
     */
    public getUserCount(){
        return Object.keys(this.users).length
    }

    /**
     * Удаление клиента. Необходимо вызывать при потере соединения
     * @param user
     * @param appId
     */
    public removeAppId(user: User, appId: string): void {
        // Удаление клиента при потере соединения
    }

    /**
     * Получение пользователя с сервера по токену
     * @param token
     * @param client
     */
    auth(token: string, client: Socket): User | null {

        console.log(`Проверка для токена ${token}`)

        const randUserId = this.config.get<string>('RAND_USER_ID')

        // Заглушка. Создается рандомный клиент
        if(typeof token === 'string'){
            this.addUser(this.getRandomInt(randUserId), client)
        }
        return null
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

}
