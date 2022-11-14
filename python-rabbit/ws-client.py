import socketio

client_count = 10

for i in range(client_count):
    sio = socketio.Client()

    @sio.event
    def connect():
        print('connection established')

    @sio.event
    def my_message(data):
        print(data)
        # sio.emit('my response', {'response': 'my response'})

    @sio.event
    def disconnect():
        print('disconnected from server')

    sio.connect('http://localhost:5000/token', headers={'authorization': 'mytoken'})
    # sio.wait()