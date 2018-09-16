var express = require('express');
var socket = require('socket.io');

const port = process.env.PORT || 3000;

// App setup
var app = express();
var server = app.listen(port, function(){
    console.log('listening for requests');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var users = []

var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
        socket.username = data.handle;
        io.sockets.emit('online', socket.username);
    });

    socket.on

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
