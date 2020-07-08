#!/usr/bin/env node

/***
 * Module Dependenies
 ***/
const http = require("http");
const debug = require("debug")("node-rest:server");

const app = require("../app/app");

/***
 * Get port from environment and store in Express
 ***/
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/***
 * Create HTTP server
 ***/
const server = http.createServer(app);

/***
 * Listen on provided port, on all network interfaces
 ***/
server.listen(port, function () {
  console.log(`Server listening on port: ${port}`);
});



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    //named pipe
    return val;
  }

  if (port >= 0) {
    //port number
    return port;
  }

  return false;
}
