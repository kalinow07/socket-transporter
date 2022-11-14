import rabbitpy
import json
import numpy

# Количество отправляемых сообщений
message_count = 10

# Определяем URL для соединения с ним
url = 'amqp://guest:guest@localhost:5672/%2F'
# Подключаемся к RabbitMQ с применением приведённого выше URL
connection = rabbitpy.Connection(url)
# Открываем новый канал в имеющемся соединении
channel = connection.channel()
# Создаём новый объект обмена, переходя в соответствующий канал для его применения
exchange = rabbitpy.Exchange(channel, 'sent-message')
# Объявляем свой обмен в сервере RabbitMQ
exchange.declare()
# Создаём некий новый объект очереди и переходим в соответствующий канал для его использования
queue = rabbitpy.Queue(channel, 'nestjs-socket-microservice')
# Объявляем значение очереди в сервере RabbitMQ
queue.declare()
# Связываем свою очередь с имеющимся обменом в нашем сервере RabbitMQ
queue.bind(exchange, 'example-routing-key')
# Отправляем 10 сообщений
for message_number in range(0, message_count):
    content = {'chatId': 1, 'members': numpy.random.randint(1, 500, 10).tolist()}
    message = rabbitpy.Message(channel,
                               json.dumps(content),
                               {'content_type': 'application/json'},
                               opinionated=False)
    message.publish(exchange, 'example-routing-key')
    print(message_number)

connection.close()
