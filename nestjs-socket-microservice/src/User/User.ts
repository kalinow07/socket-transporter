import {Socket} from "socket.io";

export class User {

    /**
     * Массив клиентов пользователя
     */
    clients = []

    constructor(public id: number, newClient: Socket) {

        let clientIds =this.clients.map((client: Socket) => {
            return client.id
        })

        if(!clientIds.includes(newClient.id)){
            this.clients.push(newClient)
        }

    }


}
