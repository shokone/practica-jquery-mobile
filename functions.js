/**
 * comprobamos si el nombre de usuario y la contraseña son correctos
 */
function compAcceso(){
	var user = document.getElementById("nombre");
	var pass = document.getElementById("password");
	if(user.value == "ivan" && pass.value == "ivan"){
		window.location.href="#menuProfesor";
	} 
}

/**
 * añadimos los cursos y alumnos al select del formulario 
 */
function camposCursoAlumno(){
	var curso = document.getElementById("selCurso");
	var alumno = document.getElementById("selAlumno");
	//añadimos los diferentes cursos
	var cursos = ['DAW', 'DAM'];
	for(var a = 0;a<cursos.length;a++){
		var option = document.createElement("option");
		option.innerHTML=cursos[a];
		option.value = cursos[a];
		curso.appendChild(option);
	}
	//añadimos los diferentes alumnos
	var alumnos = [
		'Iván Martínez', 'Marcos Lopez', 'Arkaitz Huerta', 
		'Eneko irarragorri', 'Sergio Blasco'
	];
	for(var a = 0;a<alumnos.length;a++){
		var option = document.createElement("option");
		option.innerHTML=alumnos[a];
		option.value=alumnos[a];
		alumno.appendChild(option);
	}
}

function evaluacion(){
	var curso = document.getElementById("selCurso");
	var alumno = document.getElementById("selAlumno");
}

/**
 * calculamos la nota obtenida en la presentación y la exposición del proyecto
 */
function notasPresentacion(){
	var nota = [];
	//obtenemos el campo de cada una de las notas
	for(var a=1;a<25;a++){
		nota[a] = document.getElementById("nota"+a);
	}
	var presentacion = 0;
	var expresion = 0;
	//obtenemos la nota de la presentación
	for(var a=1;a<12;a++){
		if(nota[a].value == "Bien"){
			presentacion++;
		}else if(nota[a].value == "Regular"){
			presentacion += 0.5;
		}
	}
	var resulPres = (presentacion*10)/11;
	resulPres /= 10;//nota presentación (un 10 es 1 punto)
	//obtenemos la nota de la expresión oral
	for(var a=12;a<25;a++){
		if(nota[a].value == "Bien"){
			expresion++;
		}else if(nota[a].value == "Regular"){
			expresion += 0.5;
		}
	}
	var resulExp = (expresion*10)/13;
	resulExp = (resulExp*2.5)/10;//nota de la exposición (un 10 son 2.5 puntos)
	//obtenemos el id de los campos de la nota global
	var presen = document.getElementById("cal2");
	var expres = document.getElementById("cal3");
	presen.value=Math.round(resulPres*100)/100;
	expres.value=Math.round(resulExp*100)/100;
	window.location.href="#calificacion";
}

/**
 * obtenemos la nota final del proyecto
 */
function getCalificacion(){
	var cal1 = document.getElementById("cal1");
	var cal2 = document.getElementById("cal2");
	var cal3 = document.getElementById("cal3");
	var resultado = parseFloat(cal1.value) + parseFloat(cal2.value) + parseFloat(cal3.value);
	var alumn = document.getElementById("selAlumno");
	var curso = document.getElementById("selCurso");
	var nombre = document.getElementById("aluFin");
	var dato = document.getElementById("nameF");
	var dato2 = document.getElementById("notaF");
	var cursoF = document.getElementById("cursoF");
	nombre.innerHTML = "Nota final de "+(alumn.value);
	cursoF.value = curso.value;
	dato.value = alumn.value;
	dato2.value = resultado;
	window.location.href="#notaFinal";
}

var cursos = [];
var alumnos = [];

function leeJson(){
	
	if(localStorage.getItem("json")){
		var datos = JSON.parse(localStorage.getItem("json"));
		for(var a = 0, len=datos.length;a<len;a++){
			cursos[a]=datos[a].curso;
			for(var b=0,leng=datos.alumnos.length;b<leng;b++){
				//alumnos[]=datos[a].alumnos;
			}
			$("#selCurso").append("<option value='"+datos[a].curso+"'</option>");
			//$("#selAlumno").append("<option value='"+datos[a].alumnos+"'</option>");
		}
		/*$.ajax({
			if(document.getElementById("selCurso").value == "DAW"){
				for(var a=0;a<(alumnos.length/2);a++){
					$("#selAlumno").append("<option value='"+alumnos[a]+"'</option>");
				}
			}else{
				for(var a=(alumnos.length/2);a<alumnos.length;a++){
					$("#selAlumno").append("<option value='"+alumnos[a]+"'</option>");
				}
			}
		});*/
		
	}else{
		var datos2 = $.getJSON("json/alumnos.json", function(data){
			var cont = 0;
			for(var a=0, len=data.result.length;a<len;a++){
				cursos[a]=data[a].curso;
				for(var b=0,leng=data.alumnos.length;b<leng;b++){
					alumnos[cont]=data[a].alumnos[b];
					cont++;
				}
				$("#selCurso").append("<option value='"+a+"'>"+data.result[a].curso+"</option>");
				//$("selAlumno").append("<option value='"+a+"'>"+data.result[a].alumnos+"</option>");
			}
			/*$.ajax({
				if(document.getElementById("selCurso").value == "DAW"){
					for(var a=0;a<(alumnos.length/2);a++){
						$("#selAlumno").append("<option value='"+alumnos[a]+"'</option>");
					}
				}else{
					for(var a=(alumnos.length/2);a<alumnos.length;a++){
						$("#selAlumno").append("<option value='"+alumnos[a]+"'</option>");
					}
				}
			});*/
		});
	}
}