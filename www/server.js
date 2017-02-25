var app = require('../app');
var debug = require('debug')('express-demo:server');
var http = requie('http');
var config = require('../config/config.js');
var port = config.port || '3000';
app.set('port', port);
app.disable('x-power-by');

var server = http.createServer(app);
app.ready(server);  // room房间
server.linten(port, function () {
    console.log("监听端口:" + port);
});
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privieges');
            process.exit(1);
            break;
        case 'EADDRINUSER':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on' + bind);
}