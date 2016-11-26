        var series = new Object;
        var options = new Object;
        var chart = new Object;
        var canvas = new Object;
        var textByKey = new Object;
        var unitByKey = new Object;

        textByKey['humA'] ="Hum. Ambiente";
        textByKey['humS'] ="Hum. Tierra";
        textByKey['lluvia'] ="Precipitación";
        textByKey['anem'] ="Anemómetro";
        textByKey['veleta'] ="Orientación Viento";
        textByKey['temp'] ="Temperatura";

        unitByKey['humA'] ="%";
        unitByKey['humS'] ="%";
        unitByKey['lluvia'] ="";
        unitByKey['anem'] ="Km/h";
        unitByKey['veleta'] ="";
        unitByKey['temp'] ="ºC";

        options['humA'] =   {lineWidth: 0.8, strokeStyle: '#006400', fillStyle: 'rgba(107,184,110,0.60)', grid:{fillStyle: '#eeffee'}};
        options['humS'] =   {lineWidth: 0.8, strokeStyle: '#8b4513', fillStyle: 'rgba(139,69,19,0.60)'};
        options['lluvia'] = {lineWidth: 0.8, strokeStyle: '#0000ff', fillStyle: 'rgba(25,25,155,0.60)'};
        options['anem'] =   {lineWidth: 0.8, strokeStyle: '#444444', fillStyle: 'rgba(100,100,100,0.60)'};
        options['veleta'] = {lineWidth: 0.8, strokeStyle: '#ffffff', fillStyle: 'rgba(155,155,55,0.60)'};
        options['temp'] =   {lineWidth: 0.8, strokeStyle: '#ff0000', fillStyle: 'rgba(234,52,44,0.60)'};
        

        function createGrid(){
            var body = document.body;            
            
            var names=Object.getOwnPropertyNames(options);

            for (var i = 0; i < names.length; i++) {
                var key=names[i];                
                console.log ("k:"+key);
                var gridDiv=document.createElement('div');
                var canv = document.createElement('canvas');
                canv.id = key;

                gridDiv.className+=" grid";
                

                gridDiv.setAttribute("id", key+'Div');



                gridDiv.onclick=function(){
                                            if(this.className.indexOf('Full')!=-1){ 
                                                this.className='grid';
                                            } else {
                                                this.className='gridFull';
                                            }; 
                                            var destId=this.id.split('Div')[0];                                          
                                            resizeCanvas(destId);                                            
                                        };

               
                var divText=document.createElement('div');
                
                divText.setAttribute("id", key+'Title');
                
                
                divText.className+=" gridText";
                
                divText.innerHTML = textByKey[key];
                
                gridDiv.appendChild(divText)
                gridDiv.appendChild(canv)

                body.appendChild(gridDiv);
            }
            
        }

        createGrid();
        
	
		
        function resizeCanvas(destId) {                
                //canvas[destId].width = window.innerWidth * .8;
                //canvas[destId].height = window.innerHeight*.8/cant;

                canvas[destId].style.width='95%';
                canvas[destId].style.height='95%';
                canvas[destId].width  = canvas[destId].offsetWidth;
                canvas[destId].height = canvas[destId].offsetHeight;

                //drawStuff(); 
        }



        function init(destId) {
        	console.log('initialize:'+destId);
            cant = Object.keys(options).length;					

            chart[destId] = new SmoothieChart({ millisPerPixel: 32,
                                                minValue: escala[destId].minVal,maxValue:escala[destId].maxVal,   
                                                grid: {fillStyle: '#ffffff', strokeStyle: '#c5c5c5', sharpLines: true, millisPerLine: 2000, verticalSections: 8, borderVisible: false},
                                                labels: {fillStyle:'rgba(0,0,0,0.5)', precision: 1}, timestampFormatter: SmoothieChart.timeFormatter}
                                                );

            series[destId] = new TimeSeries();


            chart[destId].addTimeSeries(series[destId], options[destId]);
            canvas[destId] = document.getElementById(destId);
            chart[destId].streamTo(canvas[destId], 500/*ms*/);


            context = canvas[destId].getContext('2d');

            // resize the canvas to fill browser window dynamically
            window.addEventListener('resize', resizeCanvas(destId), false);

            
            resizeCanvas(destId);
            
        }


        for (var key in options) {
            // skip loop if the property is from prototype
            if (!options.hasOwnProperty(key))
                continue;
            
            init(key);

            var now = new Date().getTime();
            for (var t = now - 1000 * 50; t <= now; t += 1000) {
                series[key].append(t, series[key]);
            }

            //autoInsertFor(key);
       }

        /*
        function autoInsertFor(key) {
            setInterval(function () {
                var val = Math.random();
                //console.log('key:'+key+" val:"+val)
                series[key].append(new Date().getTime(), val);
            }, 1000);

        }*/



		function isNumeric(n) {
		  return !isNaN(parseFloat(n)) && isFinite(n);
		}
      


        //SOCKET IO
        var socket = io({'connect_timeout':1000,
                        'reconnection': true,
                        'reconnectionDelay': 1000,
                        'reconnectionDelayMax': 3000,
                        'reconnectionAttempts': 10,
                        'forceNew': true}); //io declarada en socketio.js

        console.log("config socket:"+socket);          

        socket.on('connect', function(){console.log("connect")});          
        socket.on('disconnect', function(){console.log("disconnect")});

        socket.on('newServerData', function (dataStr) {
            console.log("rx:"+dataStr);
            var data=JSON.parse(dataStr);
                    
            //test data
            // {"temp1":"22","temp2":"33", "humA":"29", "humS":"29", "lluvia":"129", "anem":"20","veleta":"33" }
            var keysToGraph=['temp', 'humA', 'humS', 'lluvia', 'anem', 'veleta'];                    
            
            var dataGraph=JSON.parse(escalado(data));

			for (var i = 0; i < keysToGraph.length; i++) {
				var key=keysToGraph[i];
                var valor=dataGraph[key];
                console.log("key:"+key+ " dat:"+ dataGraph[key]);                
                var divText=document.getElementById(key+'Title');     
                var valToShow=Math.round(valor* 10) / 10; 
                divText.innerHTML = textByKey[key]+' <br>'+ (isNumeric(valToShow)?valToShow:valor) + ' '+unitByKey[key];
                series[key].append(new Date().getTime(), valor);
            }

            //socket.emit('event', dat);
        });
