'use strict';

var serialPort = require("serialport");         //load serial port library object
var readline = serialPort.parsers.readline;     //parser-separator for data input

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {

	var errMgm=function(err, data) {	
			    if (err) {
			      res.writeHead(500);
			      return res.end('Error loading static html');
			    }

			    res.writeHead(200);
			    res.end(data);		  
	};

	console.log(req['url']);
	if(req['url']==="/"){	
	  fs.readFile(__dirname+ '/public/' + 'gsmooth.html',errMgm);
	}else{
		fs.readFile(__dirname + '/public/' + req['url'], errMgm);
	}
}


if (io) {   //server created 
    console.log('listening');

    var sp = null;
    io.on('connection', function (socket) {

        if (sp === null) {
	            sp = new serialPort("COM3", {
	                baud: 9600,
	                parser: readline('\r')
	            });
		}else{
        	console.log("ya no necesita abrir puerto");
        }
		
        sp.on("open", function () {
            console.log('open serial port');
        });

		sp.on('data', function (data) { //callback de recepción de datos
            socket.emit('newServerData', data);
            console.log('rx: ' + data.toString('hex'));
        });

        sp.on('error', function (data) {
            console.log('error');
        });

        socket.on('clientData', function (clientData) {
            console.log("client" + clientData);
        });
    });
}

/*
//FORMA INCOMPRENSIBLE DE CREAR UN SERVER USANDO CANTIDAD MAXIMA DE LIBRERIAS
var express = require('express');
var appExpress = express();
var http = require('http');
var server = http.createServer(appExpress);
var io = require('socket.io').listen(server);
server.listen(80);

//FIN DE FORMA INCOMPRENSIBLE

appExpress.use(express.static('public'));


//ATIENDE METODO GET
appExpress.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/' + 'gsmooth.html');
});
*/


