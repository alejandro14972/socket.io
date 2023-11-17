//carga de módulos
var expres = require('express');
var app = expres();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const cors = require('cors'); // Importa el módulo cors

/* middleware */
app.use(expres.static('client'));
app.use(cors()); // Habilita CORS para todas las rutas   

//ruta
app.get('/hola-mundo', function (req, res) {
    res.status(200).send('hola mundo desde una ruta')
});


var messages = [{
    id: 1,
    text: 'bienvenido al chat privado de node.js',
    nickname: 'bot - alejandro'
},
{
    id: 1,
    text: 'bienvenido al chat privado de node.js',
    nickname: 'bot - alejandro'
}
];


io.on('connection', function (socket) {
    console.log("el nodo con ip:" + socket.handshake.address);

    socket.emit('messages', messages);

    socket.on('add-message', function (data) {
        messages.push(data);
        io.emit('messages', messages);  
    })

});

server.listen(6677, function () {
    console.log("ejecutado en http://localhost:6677 ");
});



