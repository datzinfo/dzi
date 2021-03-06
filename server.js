/**
 * Module dependencies.
 */

var app = require('./express');
var debug = require('debug')('website:server');
var http = require('http');
var models = require("./models");

/**
 * Get port from environment and store in Express.
 */

var port = process.env.NODE_PORT || 8080;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

models.sequelize.sync().then(function () {
    // seed the db
    require('./config/seed')(models);
    
    /**
     * Listen on provided port, on all network interfaces.
     */

    var server_ip_address = process.env.NODE_IP || '127.0.0.1'
    server.listen(port, server_ip_address, function () {
    	  console.log( "Listening on " + server_ip_address + ", server_port " + port )
    	});
    server.on('error', onError);
    server.on('listening', onListening);
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}
