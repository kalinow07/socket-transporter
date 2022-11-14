Запуск контейнера с RabbitMQ
- из папки docker запустить docker-compose up -d

Запуск приложения NestJs
- из папки nestjs-socket-microservice запустить npm i npm
- из папки nestjs-socket-microservice запустить npm run start:dev

С целью простоты запуска в папке python-rabbit уже присутствует python-интерпретатор со всеми необходимыми библиотеками.

Тестирование:
- В файле ws-client.py поменять значение переменной client_count. Это количество socket соединений к микросервису
- В файле send-message-to-rabbitmq.py поменять значение message_count - это количество отправляемых сообщений в rabbitMQ
- Запустить скрипт "./python-rabbit/venv/bin/python python-rabbit/ws-client.py" Это создаст соединения.
- Запустить скприпт "./python-rabbit/venv/bin/python python-rabbit/send-message-to-rabbitmq.py" - это отправит сообщения в брокер
- В терминале запуска ws-client.py будет отображаться ход получения сообщений
