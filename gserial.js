'use strict';

var serialPort = require("serialport");         //load serial port library object
var readline = serialPort.parsers.readline;     //parser-separator for data input


//FORMA INCOMPRENSIBLE DE CREAR UN SERVER USANDO CANTIDAD MAXIMA DE LIBRERIAS
var express = require('express');
var appExpress = express();
var http = require('http');
var server = http.createServer(appExpress);
var io = require('socket.io').listen(server);
server.listen(80);
/*
var app    = require('express')();
var server = require('http').Server(app);
var io     = require('socket.io')(server);

server.listen(80);
*/
//FIN DE FORMA INCOMPRENSIBLE

//ATIENDE METODO GET
appExpress.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/' + 'graph.html');
});

if (io) {   //server created 
    console.log('listening');

    var sp = null;
    io.sockets.on('connection', function (socket) {

        if (sp === null) {
            sp = new serialPort("COM77", {
                baud: 57600,
                parser: readline('\r')
            });

            sp.on("open", function () {
                console.log('open serial port');
                sp.on('data', function (data) {
                    console.log('data received: ' + data.toString('hex'));
                    socket.emit('newServerData', data);
                });

                sp.on('error', function (data) {
                    console.log('error');
                });
            });
        }
        socket.on('clientData', function (clientData) {
            console.log("client" + clientData);
        });
    });
}
