//variables globales
var cursos = []; //guardamos los cursos del archivo json
var alumnos1 = []; //nombre de alumnos curso 1
var alumnos2 = []; //nombre alumnos curso 2
var total = []; //notas totales alumnos 
var presen = []; //nota presentacion 
var expo = []; //nota exposicion 

/**
 * comprobamos si el nombre de usuario y la contraseña son correctos
 */
function compAcceso() {
    var user = document.getElementById("nombre");
    var pass = document.getElementById("password");
    if (user.value == "" && pass.value == "") {
        window.location.href = "#menuProfesor";
    }
}

/**
 * añadimos los cursos y alumnos al select del formulario 
 */
function camposCursoAlumno() {
    var curso = document.getElementById("selCurso");
    var alumno = document.getElementById("selAlumno");
    //añadimos los diferentes cursos
    var cursos = ['DAW', 'DAM'];
    for (var a = 0; a < cursos.length; a++) {
        var option = document.createElement("option");
        option.innerHTML = cursos[a];
        option.value = cursos[a];
        curso.appendChild(option);
    }
    //añadimos los diferentes alumnos
    var alumnos = [
        'Iván Martínez', 'Marcos Lopez', 'Arkaitz Huerta',
        'Eneko irarragorri', 'Sergio Blasco'
    ];
    for (var a = 0; a < alumnos.length; a++) {
        var option = document.createElement("option");
        option.innerHTML = alumnos[a];
        option.value = alumnos[a];
        alumno.appendChild(option);
    }
}

/**
 * calculamos la nota obtenida en la presentación y la exposición del proyecto
 */
function notasPresentacion() {
    var nota = [];
    var presen = [];
    var expo = [];
    //obtenemos el campo de cada una de las notas
    for (var a = 0; a < 24; a++) {
        nota[a] = document.getElementById("nota" + a);
    }
    var presentacion = 0;
    var expresion = 0;
    //obtenemos la nota de la presentación
    for (var a = 0; a < 11; a++) {
        if (nota[a].value == "Bien") {
            presen[a]=nota[a].value;
            presentacion++;
        } else if (nota[a].value == "Regular") {
            presen[a]=nota[a].value;
            presentacion += 0.5;
        }
    }
    var resulPres = (presentacion * 10) / 11;
    resulPres /= 10; //nota presentación (un 10 es 1 punto)
    //obtenemos la nota de la expresión oral
    for (var a = 11; a < 24; a++) {
        for(var b=0;b<13;b++){
            if (nota[a].value == "Bien") {
                expo[a]=nota[a].value;
                expresion++;
            } else if (nota[a].value == "Regular") {
                expo[a]=nota[a].value;
                expresion += 0.5;
            }
            a++;
        }
    }
    var resulExp = (expresion * 10) / 13;
    console.log(total[0]);
    resulExp = (resulExp * 2.5) / 10; //nota de la exposición (un 10 son 2.5 puntos)
    //obtenemos el id de los campos de la nota global
    var content = document.getElementById("cal1");
    var presen = document.getElementById("cal2");
    var expres = document.getElementById("cal3");
    content.value = total[0];
    presen.value = Math.round(resulPres * 100) / 100;
    expres.value = Math.round(resulExp * 100) / 100;
    window.location.href = "#calificacion";
}

/**
 * obtenemos la nota final del proyecto
 */
function getCalificacion() {
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
    nombre.innerHTML = "Nota final de " + (alumn.value);
    cursoF.value = curso.value;
    dato.value = alumn.value;
    dato2.value = resultado;
    window.location.href = "#notaFinal";
}

/**
 * leemos y cargamos los datos del archivo json
 */
function leeJson() {
    //leemos los datos del archivo json
    if (localStorage.getItem("son")) {
        var datos = JSON.parse(localStorage.getItem("son"));
        for (var a = 0, len = datos.length; a < len; a++) {
            cursos[a] = datos[a].curso;
            if (a == 0) {
                $("#selCurso").append("<option value='" + cursos[a] + "' onclick='compCurso(this.value);'>" + cursos[a] + "</option>");
                for (var b = 0, leng = datos[a].alumnos.length; b < leng; b++) { //obtenemos el nombre
                    alumnos1[b] = datos[a].alumnos[b].nombre;
                    $("#selAlumno").append("<option value='" + alumnos1[b] + "'>" + alumnos1[b] + "</option>");
                }
            } else { //
                $("#selCurso").append("<option value='" + datos[a].curso + "'>" + cursos[a] + "</option>");
                for (var b = 0, leng = datos[a].alumnos.length; b < leng; b++) {
                    //obtenemos el nombre
                    alumnos2[b] = datos[a].alumnos[b].nombre;
                }
            }
        }
    } else {
        var datos2 = $.getJSON("json/alumnos.json", function(data) {
            var cont = 0;
            for (var a = 0, len = data.result.length; a < len; a++) {
                cursos[a] = data.result[a].curso;
                if (a == 0) {
                    $("#selCurso").append("<option value='" + cursos[a] + "' onclick='compCurso(this.value);'>" + cursos[a] + "</option>");
                    for (var b = 0, leng = data.result[a].alumnos.length; b < leng; b++) {
                        //obtenemos el nombre
                        alumnos1[b] = data.result[a].alumnos[b].nombre;
                        $("#selAlumno").append("<option value='" + alumnos1[b] + "'>" + alumnos1[b] + "</option>");
                    }
                } else {
                    $("#selCurso").append("<option value='" + data.result[a].curso + "' onclick='compCurso(this.value);'>" + cursos[a] + "</option>");
                    for (var b = 0, leng = data.result[a].alumnos.length; b < leng; b++) {
                        //obtenemos el nombre
                        alumnos2[b] = data.result[a].alumnos[b].nombre;
                    }
                }
            }
        });
    }
}

/**
 * cambiamos los usuarios según el curso seleccionado
 */
function compCurso(nameCurso) {
    //comprobamos si hemos cambiado la opción del curso
    //si la hemos cambiado cargamos los alumnos de ese curso
    if (nameCurso == cursos[0]) {
        $("#selAlumno").empty();
        for (var b = 0; b < alumnos1.length; b++) {
            $("#selAlumno").append("<option value='" + alumnos1[b] + "'>" + alumnos1[b] + "</option>");
        }
    } else {
        $("#selAlumno").empty();
        for (var b = 0; b < alumnos2.length; b++) {
            $("#selAlumno").append("<option value='" + alumnos2[b] + "'>" + alumnos2[b] + "</option>");
        }
    }
}

/**
 * obtenemos las notas del alumno a partir del alumno seleccionado
 */
function getNotas(nombre) {
	//var nombre = document.getElementById("selAlumno");
    if (localStorage.getItem("son")) {
        var datos = JSON.parse(localStorage.getItem("son"));
        for (var a = 0, len = datos.alumnos.length; a < len; a++) {
            for (var b = 0, leng = datos[a].alumnos.length; b < leng; b++) {
                if(nombre == datos[a].alumnos.nombre) {
                    //obtenemos las notas notales
                    total[0] = datos[a].alumnos[b].notasTotales[0];//contenido
                    total[1] = datos[a].alumnos[b].notasTotales[1];//presentacion
                    total[2] = datos[a].alumnos[b].notasTotales[2];//expresion
                    total[3] = datos[a].alumnos[b].notasTotales[3];//total
                    //obtenemos las notas de la presentación
                    for(var x=0;x<11;x++){
                    	presen[x] = datos[a].alumnos[b].notasPresentacion[x];
                    }
                    //obtenemos las notas de la exposición oral
                    for(var x=0;x<13;x++){
                    	expo[x] = datos[a].alumnos[b].notasExpresion[x];
                    }
                    
                }
            }
        }
        insertarPuntuacion(presen, expo);
    } else {
        var datos2 = $.getJSON("json/alumnos.json", function(data) {
            for (var a = 0, len = data.result.length; a < len; a++) {
                for (var b = 0, leng = data.result[a].alumnos.length; b < leng; b++) {
                    if (nombre == data.result[a].alumnos[b].nombre) {
                        //obtenemos las notas notales
                        total[0] = data.result[a].alumnos[b].notasTotales[0];//contenido
                        total[1] = data.result[a].alumnos[b].notasTotales[1];//presentacion
                        total[2] = data.result[a].alumnos[b].notasTotales[2];//expresion
                        total[3] = data.result[a].alumnos[b].notasTotales[3];//total
                        //obtenemos las notas de la presentación
                        for(var x=0;x<11;x++){
	                    	presen[x] = data.result[a].alumnos[b].notasPresentacion[x];
	                    }
	                    //obtenemos las notas de la exposición oral
	                    for(var x=0;x<13;x++){
	                    	expo[x] = data.result[a].alumnos[b].notasExpresion[x];
	                    }
	                    
                    }
                }
            }
            insertarPuntuacion(presen, expo);
        });
        
    }
}

function insertarPuntuacion(presen, expo){
	for(var a=0;a<24;a++){
    	var nota = "#nota"+a;
    	if(a < 11){
			if(presen[a] == 1){
				$(nota).append("<option value='Bien' selected='selected'>Bien</option>");
				$(nota).append("<option value='Regular'>Regular</option>");
				$(nota).append("<option value='Mal'>Mal</option>");
			}else if(presen[a] == 0.5){
				$(nota).append("<option value='Bien'>Bien</option>");
				$(nota).append("<option value='Regular' selected='selected'>Regular</option>");
				$(nota).append("<option value='Mal'>Mal</option>");
			}else{
				$(nota).append("<option value='Bien'>Bien</option>");
				$(nota).append("<option value='Regular'>Regular</option>");
				$(nota).append("<option value='Mal' selected='selected'>Mal</option>");
			}
		}else{
            for(var b=0;b<13;b++){
                var nota = "#nota"+a;
    			if(expo[b] == 1){
    				$(nota).append("<option value='Bien' selected='selected'>Bien</option>");
    				$(nota).append("<option value='Regular'>Regular</option>");
    				$(nota).append("<option value='Mal'>Mal</option>");
    			}else if(expo[b] == 0.5){
    				$(nota).append("<option value='Bien'>Bien</option>");
    				$(nota).append("<option value='Regular' selected='selected'>Regular</option>");
    				$(nota).append("<option value='Mal'>Mal</option>");
    			}else{
    				$(nota).append("<option value='Bien'>Bien</option>");
    				$(nota).append("<option value='Regular'>Regular</option>");
    				$(nota).append("<option value='Mal' selected='selected'>Mal</option>");
    			}
                a++;
            }
		}
    }
    window.location.href="#alumno";
}
