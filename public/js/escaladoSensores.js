
function fit(in0,from0,to0,fromFix0,toFix0){

var a1=from0;
var a2=to0;
var b1=1;
var b2=1;
var c1=fromFix0;
var c2=toFix0;
var den=(a2*b1-a1*b2);
var res=0;

if(den!=0){
	//a1x+b1y=c1
	//a2x+b2y=c2
	//cramer
	var x=(b1*c2-b2*c1)/den;
	var y=(a2*c1-a1*c2)/den;
	res=in0*x+y;

}else{

	console.log("error div 0");
}
return res;
}//fit(5, 1,100,1,100)




function tablaVeleta(anVeleta){

	if(anVeleta>4.1){
		return "Este";
	}
	
	if(anVeleta>2.5 && anVeleta<=4.1){
		return "Sur-Este";
	}
	
	if(anVeleta>1.47 && anVeleta<=2.5){
		return "Sur";
	}
	
	if(anVeleta>0.77 && anVeleta<=1.47){
		return "Nor-Este";
	}
	
	if(anVeleta>0.4 && anVeleta<=0.77){
		return "Sur-Oeste";
	}
	
	if(anVeleta>0.2 && anVeleta<=0.4){
		return "Norte";
	}
	
	if(anVeleta>0.1 && anVeleta<=0.2){
		return "Nor-Oeste";
	}

	if(anVeleta>0 && anVeleta<=0.1){
		return "Oeste";
	}
}




function tablaLluvia(anLluvia){

	if(anLluvia>0 && anLluvia<=1.5){
		return "Lluvia intensa";
	}
	
	if(anLluvia>1.5 && anLluvia<=2){
		return "Lluvia liviana";
	}
	
	if(anLluvia>2 && anLluvia<=3){
		return "Alta probabilidad de lluvia";
	}
	
	if(anLluvia>3 && anLluvia<=3.5){
		return "Baja probabilidad de lluvia";
	}
	
	if(anLluvia>3.5){
		return "Sin lluvia";
	}
}



function escalado(datos){
	
//test ejemplo

/*
var anTemp1=100;
var anTemp2=10;
var anHumedadSuelo=240;
var anLluvia=210;
var humedadAmbiente=6500;
var anemometro=6000;

var anLluvia=10;
var anVeleta=50;
*/

var keys= ['temp1', 'temp2', 'humA', 'humS', 'lluvia', 'anem', 'veleta'];

var anTemp1=datos['temp1'];
var anTemp2=datos['temp2'];
var anHumedadSuelo=datos['humS'];
var humedadAmbiente=datos['humA'];
var anemometro=datos['anem'];
var anLluvia=datos['lluvia'];
var anVeleta=datos['veleta'];

var anTempEscalado= fit(anTemp1-anTemp2/*valor*/,-136/*inicio*/,90/*fin*/, -52/*escala salida inicio*/,52/*escala salida fin*/);
var anHumedadSueloEscalado=fit(anHumedadSuelo/*valor*/,0/*inicio*/,255/*fin*/, 100/*escala salida inicio*/,0/*escala salida fin*/);
var humedadAmbienteEscalado= fit(humedadAmbiente/*valor*/,6033/*inicio*/,7351/*fin*/, 100/*escala salida inicio*/,0/*escala salida fin*/);
var anemometroEscalado= fit(anemometro/*valor*/,0/*inicio*/,12000/*fin*/, 0/*escala salida inicio*/,100/*escala salida fin*/); 
var anLluviaTabla=tablaLluvia(anLluvia);
var anVeletaTabla=tablaVeleta(anVeleta);

console.log("temp:"+anTempEscalado);
console.log("hum Suelo:"+anHumedadSueloEscalado);
console.log("hum Amb:"+humedadAmbienteEscalado);
console.log("anem:"+anemometroEscalado);
console.log("lluvia:"+anLluviaTabla);
console.log("veleta:"+anVeletaTabla);

var ret= '{"temp":"'+anTempEscalado+'",'+
		 '"humA":"'+humedadAmbienteEscalado+'",'+
		 '"humS":"'+anHumedadSueloEscalado+'",'+
		 '"lluvia":"'+anLluviaTabla+'",'+
		 '"anem":"'+anemometroEscalado+'",'+
		 '"veleta":"'+anVeletaTabla+'"'+'}';

console.log(ret);

return ret;


}