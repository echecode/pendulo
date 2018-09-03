    var protocol = new Object;

    protocol["kp"] = {
      pic2web: function(value) {
        document.getElementById("kpvalue").innerHTML = value;
      },
      web2pic: function() {
        return "p" + document.getElementById("kp").value + "\r";
      }
    };
    protocol["ki"] = {
      pic2web: function(value) {
        document.getElementById("kivalue").innerHTML = value;
      },
      web2pic: function() {
        return "i" + document.getElementById("ki").value + "\r";
      }
    };
    protocol["kd"] = {
      pic2web: function(value) {
        document.getElementById("kdvalue").innerHTML = value;
      },
      web2pic: function() {
        return "d" + document.getElementById("kd").value + "\r";
      }
    };
    protocol["kp2"] = {
      pic2web: function(value) {
        document.getElementById("kp2value").innerHTML = value;
      },
      web2pic: function() {
        return "q" + document.getElementById("kp2").value + "\r";
      }
    };
    protocol["ki2"] = {
      pic2web: function(value) {
        document.getElementById("ki2value").innerHTML = value;
      },
      web2pic: function() {
        return "w" + document.getElementById("ki2").value + "\r";
      }
    };
    protocol["kd2"] = {
      pic2web: function(value) {
        document.getElementById("kd2value").innerHTML = value;
      },
      web2pic: function() {
        return "e" + document.getElementById("kd2").value + "\r";
      }
    };
    protocol["cOn"] = {
      pic2web: function(value) {
        document.getElementById("cOnvalue").innerHTML = value;
      },
      web2pic: function() {
        return "c" + ((document.getElementById("cOn").checked) ? '1' : '0') + "\r";
      }
    };
    protocol["ds0"] = {
      pic2web: function(value) {
        document.getElementById("dsvalue").innerHTML = value;
      },
      web2pic: function() {
        return "m0\r";
      }
    };
    protocol["ds1"] = {
      pic2web: function(value) {
        document.getElementById("dsvalue").innerHTML = value;
      },
      web2pic: function() {
        return "m1\r";
      }
    };
    protocol["ds2"] = {
      pic2web: function(value) {
        document.getElementById("dsvalue").innerHTML = value;
      },
      web2pic: function() {
        return "m2\r";
      }
    };
    protocol["ds"] = {
      pic2web: function(value) {
        var id = "ds" + value + "value";
        document.getElementById(id).checked = true;
      },
      web2pic: function() {
        return "m0\r";
      }
    };
    protocol["ps"] = {
      pic2web: function(value) {
        document.getElementById("psvalue").innerHTML = value;
      },
      web2pic: function() {
        return "n" + document.getElementById("ps").value + "\r";
      }
    };
    protocol["dm"] = {
      pic2web: function(value) {
        document.getElementById("dmvalue").innerHTML = value;
      },
      web2pic: function() {
        return "3" + document.getElementById("dm").value + "\r";
      }
    };
    protocol["dl"] = {
      pic2web: function(value) {
        document.getElementById("dlvalue").innerHTML = value;
      },
      web2pic: function() {
        return "1" + document.getElementById("dl").value + "\r";
      }
    };
    protocol["dt"] = {
      pic2web: function(value) {
        document.getElementById("dtvalue").innerHTML = value;
      },
      web2pic: function() {
        return "2" + document.getElementById("dt").value + "\r";
      }
    };
    protocol["r"] = {
      pic2web: function(value) { /*console.log("recibe r con valor "+value)*/ ;
      },
      web2pic: function() {
        return "r56\r";
      }
    };
    protocol["z"] = {
      pic2web: function(value) { /*console.log("recibe z con valor "+value)*/ ;
      },
      web2pic: function() {
        return "z\r";
      }
    };
    protocol["s"] = {
      pic2web: function(value) { /*console.log("recibe s con valor "+value)*/ ;
      },
      web2pic: function() {
        return "s" + document.getElementById("s").value + "\r";
      }
    };

    var socket;


    function getGraficasStructure() {
      var graficas = {};
      graficas['errorYcontrol'] = {
        titulo: 'Error y Control',
        id: 'errorYcontrol',
        unidades: {
          e: 'º',
          c: ''
        },
        lineas: {
          e: {
            lineWidth: 1.8,
            strokeStyle: '#006400',
            /*fillStyle: 'rgba(107,184,110,0.60)',*/
            grid: {
              fillStyle: '#eeffee'
            }
          },
          c: {
            lineWidth: 0.8,
            strokeStyle: '#640000',
            /*fillStyle: 'rgba(107,184,110,0.60)',*/
            grid: {
              fillStyle: '#eeffee'
            }
          }
        },
        chartConfig: {
          millisPerPixel: 20,
          horizontalLines: [{
            color: '#000000',
            lineWidth: 1,
            value: 0
          }, {
            color: '#880000',
            lineWidth: 1,
            value: 164
          }, {
            color: '#880000',
            lineWidth: 1,
            value: -164
          }],
          minValue: -500,
          maxValue: 500,
          grid: {
            fillStyle: '#ffffff',
            strokeStyle: '#c5c5c5',
            sharpLines: true,
            millisPerLine: 2000,
            verticalSections: 8,
            borderVisible: true
          },
          labels: {
            fillStyle: 'rgba(0,0,0,0.5)',
            precision: 1
          },
          timestampFormatter: SmoothieChart.timeFormatter
        }
      }
      graficas['error'] = {
        titulo: 'Error',
        id: 'error',
        unidades: {
          e: 'º'
        },
        lineas: {
          e: {
            lineWidth: 1.8,
            strokeStyle: '#006400',
            /*fillStyle: 'rgba(107,184,110,0.60)',*/
            grid: {
              fillStyle: '#eeffee'
            }
          }
        },
        chartConfig: {
          millisPerPixel: 20,
          horizontalLines: [{
            color: '#000000',
            lineWidth: 1,
            value: 0
          }, {
            color: '#880000',
            lineWidth: 1,
            value: 164
          }, {
            color: '#880000',
            lineWidth: 1,
            value: -164
          }],
          minValue: -500,
          maxValue: 500,
          grid: {
            fillStyle: '#ffffff',
            strokeStyle: '#c5c5c5',
            sharpLines: true,
            millisPerLine: 2000,
            verticalSections: 8,
            borderVisible: true
          },
          labels: {
            fillStyle: 'rgba(0,0,0,0.5)',
            precision: 1
          },
          timestampFormatter: SmoothieChart.timeFormatter
        }
      }
      graficas['control'] = {
        titulo: 'Control',
        id: 'control',
        unidades: {
          c: ''
        },
        lineas: {
          c: {
            lineWidth: 1.8,
            strokeStyle: '#006400',
            /*fillStyle: 'rgba(107,184,110,0.60)',*/
            grid: {
              fillStyle: '#eeffee'
            }
          }
        },
        chartConfig: {
          millisPerPixel: 20,
          horizontalLines: [{
            color: '#000000',
            lineWidth: 1,
            value: 0
          }, {
            color: '#880000',
            lineWidth: 1,
            value: 164
          }, {
            color: '#880000',
            lineWidth: 1,
            value: -164
          }],
          minValue: -1500,
          maxValue: 1500,
          grid: {
            fillStyle: '#ffffff',
            strokeStyle: '#c5c5c5',
            sharpLines: true,
            millisPerLine: 2000,
            verticalSections: 8,
            borderVisible: true
          },
          labels: {
            fillStyle: 'rgba(0,0,0,0.5)',
            precision: 1
          },
          timestampFormatter: SmoothieChart.timeFormatter
        }
      }
      return graficas;
    }

    /*var fruits = ["Banana", "Orange", "Apple", "Mango"];
    document.getElementById("demo").innerHTML = fruits;

    function myFunction() {
    	if (fruits.indexOf("Lemon")===-1){
        fruits.push("Lemon");
        }
        document.getElementById("demo").innerHTML = fruits;
    }*/

    function createGrid(grafico) {
      var gridDiv = document.createElement('div');
      grafico.canvas = document.createElement('canvas');
      grafico.canvas.id = grafico.id;
      gridDiv.className += " grid";
      gridDiv.setAttribute("id", grafico.id + 'Div');
      gridDiv.onclick = function() {
        if (this.className.indexOf('Full') != -1) {
          this.className = 'grid';
        } else {
          this.className = 'gridFull';
        }
        resizeCanvas(grafico.canvas);
      };
      grafico.divText = document.createElement('div');
      grafico.divText.setAttribute("id", grafico.id + 'Title');
      grafico.divText.className += " gridText";
      grafico.divText.innerHTML = grafico.titulo;
      gridDiv.appendChild(grafico.divText)
      gridDiv.appendChild(grafico.canvas)
      document.body.appendChild(gridDiv);
      window.addEventListener('resize', resizeCanvas(grafico.canvas), false);
      resizeCanvas(grafico.canvas);
      console.log(grafico.canvas);
    }



    function resizeCanvas(canvas) {
      canvas.style.width = '95%';
      canvas.style.height = '95%';
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    /*
	            t   -> PIC -> tik           -> descripcion:
	            e   -> PIC -> error         -> descripcion:
	            c   -> PIC -> ctrl          -> descripcion:
	            p   -> PIC -> dutyPWM       -> descripcion:
                r   -> PIC -> retornoConfig -> descripcion:
                kp  -> PIC -> Kp            -> descripcion:
                ki  -> PIC -> Ki            -> descripcion:
                kd  -> PIC -> Kd            -> descripcion:
                kp2 -> PIC -> Kp2           -> descripcion:
                ki2 -> PIC -> Ki2           -> descripcion:
                kd2 -> PIC -> Kd2           -> descripcion:
                cOn -> PIC -> controlOn     -> descripcion:
                ds  -> PIC -> dirStep       -> descripcion:
                ps  -> PIC -> potenciaStep  -> descripcion:
                dm  -> PIC -> dutyPWMmin    -> descripcion:
                dl  -> PIC -> dutyPWMlimit  -> descripcion:
                dt  -> PIC -> dutyPWMlimitTimeout -> descripcion:
            */

    /*
            parameters['kp'] = {title: "Kp", value: 1000, inputAttr: {id: "kpinput", type: "text"}, sendAttr: {id: "kpsend", value: "Set"}};
            parameters['ki'] = {title: "Ki", value: 0, inputAttr: {id: "kdinput", type: "text"}, sendAttr: {id: "kisend", value: "Set"}};
            parameters['kd'] = {title: "Kd", value: 0, inputAttr: {id: "kiinput", type: "text"}, sendAttr: {id: "kdsend", value: "Set"}};
            parameters['kp2'] = {title: "Kp2", value: 100, inputAttr: {id: "kp2input", type: "text"}, sendAttr: {id: "kp2send", value: "Set"}};
            parameters['ki2'] = {title: "Ki2", value: 0, inputAttr: {id: "ki2input", type: "text"}, sendAttr: {id: "ki2send", value: "Set"}};
            parameters['kd2'] = {title: "Kd2", value: 0, inputAttr: {id: "kd2input", type: "text"}, sendAttr: {id: "kd2send", value: "Set"}};
            parameters['cOn'] = {title: "Control On", value: 1, inputAttr: {id: "cOninput", type: "text"}, sendAttr: {id: "cOnsend", value: "Set"}};
            parameters['ds'] = {title: "Direccion de Escalon", value: 1, inputAttr: {id: "dsinput", type: "text"}, sendAttr: {id: "dssend", value: "Set"}};
            parameters['ps'] = {title: "Potencia de Escalon", value: 1, inputAttr: {id: "psinput", type: "text"}, sendAttr: {id: "pssend", value: "Set"}};
            parameters['dm'] = {title: "Minimo PWM", value: 1, inputAttr: {id: "dminput", type: "text"}, sendAttr: {id: "dmsend", value: "Set"}};
            parameters['dl'] = {title: "Limite de PWM", value: 1, inputAttr: {id: "dlinput", type: "text"}, sendAttr: {id: "dlsend", value: "Set"}};
            parameters['dt'] = {title: "Tiempo de corte", value: 1, inputAttr: {id: "dtinput", type: "text"}, sendAttr: {id: "dtsend", value: "Set"}};
            parameters['z'] = {title: "Zero", value: 1, inputAttr: {id: "zinput", type: "text"}, sendAttr: {id: "zsend", value: "Zero"}};

            var inputFields = new Object;                           // Campos de ingreso
            var sendBtns = new Object;                              // Botones de accion
            var parametersDiv = document.createElement('div');      // Div base del formulario
            body.appendChild(parametersDiv);                        // Agregamos el div a la pagina
            parametersDiv.setAttribute("style", "float: right;");   // Atributos
            var table = document.createElement('table');            // Elemento tabla para alinear los campos del formulario
            parametersDiv.appendChild(table);                       // Agregamos la tabla al div
            for (var parameterKey in parameters) {                  // Por cada parametro...
                var row = table.insertRow(-1);                      // insertamos una fila al final de la tabla...
                var nameCell = row.insertCell(0);                   // con...
                var inputCell = row.insertCell(1);                  // tres...
                var sendCell = row.insertCell(2);                   // celdas.

                nameCell.innerHTML = parameters[parameterKey].title;

                if (typeof parameters[parameterKey].inputAttr != 'undefined'){      // Si el parametro admite input
                    inputFields[parameterKey] = document.createElement('input');
                    for (var inputAttr in parameters[parameterKey].inputAttr){
                        inputFields[parameterKey].setAttribute(inputAttr, parameters[parameterKey].inputAttr[inputAttr]);
                    }
                    inputCell.appendChild(inputFields[parameterKey]);
                }


                if (typeof parameters[parameterKey].sendAttr != 'undefined'){      // Si el parametro admite button
                    sendBtns[parameterKey] = document.createElement('button');
                    sendBtns[parameterKey].innerHTML = parameters[parameterKey].sendAttr.value;
                    for (var sendAttr in parameters[parameterKey].sendAttr){
                        sendBtns[parameterKey].setAttribute(sendAttr, parameters[parameterKey].sendAttr[sendAttr]);
                    }
                    sendBtns[parameterKey].setAttribute("onClick", "enviar(\""+parameterKey+"\")");
                    sendCell.appendChild(sendBtns[parameterKey]);
                }
            }
            /*
            function autoInsertFor(key) {
                setInterval(function () {
                    var val = Math.random();
                    //console.log('key:'+key+" val:"+val)
                    series[key].append(new Date().getTime(), val);
                }, 1000);

            }*/

    function enviar(parameterKey) {
      //console.log(typeof protocol[parameterKey])
      var arg;
      if (protocol.hasOwnProperty(parameterKey)) {
        arg = protocol[parameterKey].web2pic();
        socket.emit('clientData', arg);
      }
      /* else if (parameterKey == "all") {
                    for (var key in protocol.keys()) {
                      arg = protocol[key].web2pic();
                      socket.emit('clientData', arg)
                    }*/
      //socket.emit('clientData', "r1\r")
      //}


      if (!(parameterKey.indexOf('r') > -1)) {
        setTimeout(function() {
          enviar('r');
        }, 50);


      }
    }


    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function inicializarGraficos() {
      graficas = getGraficasStructure();
      var seriesKeys = [];
      for (var grafico in graficas) {
        if (graficas.hasOwnProperty(grafico)) {
          createGrid(graficas[grafico]);
          graficas[grafico].chart = new SmoothieChart(graficas[grafico].chartConfig);
          graficas[grafico].chart.streamTo(graficas[grafico].canvas, 0 /*ms*/ );
          for (var linea in graficas[grafico].lineas) {
            if (graficas[grafico].lineas.hasOwnProperty(linea)) {
              if (seriesKeys.indexOf(linea) === -1) {
                seriesKeys.push(linea);
              }
            }
          }

          console.log(seriesKeys);
        }
      }

      var series = new Object;
      seriesKeys.forEach(function(key) {
        series[key] = new TimeSeries();
        var now = new Date().getTime();
        for (var t = now - 1000 * 20; t <= now; t += 1000) {
          series[key].append(t, series[key]);
        }
      });
      for (var grafico in graficas) {
        if (graficas.hasOwnProperty(grafico)) {
          for (var linea in graficas[grafico].lineas) {
            if (graficas[grafico].lineas.hasOwnProperty(linea)) {
              console.log(linea);
              graficas[grafico].chart.addTimeSeries(series[linea], graficas[grafico].lineas[linea]);
            }
          }
        }
      }


      //SOCKET IO
      socket = io({
        'connect_timeout': 1000,
        'reconnection': true,
        'reconnectionDelay': 1000,
        'reconnectionDelayMax': 3000,
        'reconnectionAttempts': 10,
        'forceNew': true
      }); //io declarada en socketio.js

      //console.log("config socket:"+socket);

      socket.on('connect', function() {
        console.log("connect")
      });
      socket.on('disconnect', function() {
        console.log("disconnect")
      });

      socket.on('newServerData', function(dataStr) { // Al recibir datos desde el servidor
        //console.log("rx remote:"+dataStr);
        var data = JSON.parse(dataStr); // los guarda en data

        // Ejemplo de data:
        // {"t":0,"e":0,"c":0,"p":0[,"r":1,"kp":1,"ki":0,"kd":0,"kp2":1,"ki2":0,"kd2":0,"cOn":1,"ds":1,"ps":700,"dm":5,"dl":600,"dt":5]}     []: Solo se recibe a pedido de r=1
        /*
	            t   -> PIC -> tik           -> descripcion:
	            e   -> PIC -> error         -> descripcion:
	            c   -> PIC -> ctrl          -> descripcion:
	            p   -> PIC -> dutyPWM       -> descripcion:
                r   -> PIC -> retornoConfig -> descripcion:
                kp  -> PIC -> Kp            -> descripcion:
                ki  -> PIC -> Ki            -> descripcion:
                kd  -> PIC -> Kd            -> descripcion:
                kp2 -> PIC -> Kp2           -> descripcion:
                ki2 -> PIC -> Ki2           -> descripcion:
                kd2 -> PIC -> Kd2           -> descripcion:
                cOn -> PIC -> controlOn     -> descripcion:
                ds  -> PIC -> dirStep       -> descripcion:
                ps  -> PIC -> potenciaStep  -> descripcion:
                dm  -> PIC -> dutyPWMmin    -> descripcion:
                dl  -> PIC -> dutyPWMlimit  -> descripcion:
                dt  -> PIC -> dutyPWMlimitTimeout -> descripcion:
            */


        for (var elemento in data) {
          if ((data.hasOwnProperty(elemento)) && !(seriesKeys.indexOf(elemento) === -1)) {
            var valor = data[elemento];
            var valToShow = Math.round(valor * 10) / 10;
              //TODO: grafico.divText.innerHTML = grafico.titulo + ' <br>' + (isNumeric(valToShow) ? valToShow : valor) + ' ' + grafico.unidades[???];????
              series[key].append(new Date().getTime(), valor);
          }
        }
        /*var keysToGraph = ['e', 'c']; //,'p'];                // Variables de 'data' a graficar
        for (var i = 0; i < keysToGraph.length; i++) { // Graficar las varialbes previamente elegidas
          var key = keysToGraph[i];
          var valor = data[key];
          console.log("key:" + key + " dat:" + data[key]);
          var divText = document.getElementById(key + 'Title');
          var valToShow = Math.round(valor * 10) / 10;
          divText.innerHTML = textByKey[key] + ' <br>' + (isNumeric(valToShow) ? valToShow : valor) + ' ' + unitByKey[key];
          series[key].append(new Date().getTime(), valor);
        }*/

        if (typeof data['r'] != 'undefined') {
          for (var datakey in data) {
            if (protocol.hasOwnProperty(datakey)) {
              protocol[datakey].pic2web(data[datakey]);
            }
          }
        }
      });
    }
    inicializarGraficos();
