const express = require('express');
const app = express();
const path = require('path');
const SocketIo = require('socket.io');
//settings server
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')))

//routes
const server = app.listen(app.get('port'), () => console.log(`Started server on port ${app.get('port')}`))

//sockets
const io = SocketIo(server);
io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    });
    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
})
