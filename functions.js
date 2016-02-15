function compAcceso(){
	var user = document.getElementById("nombre");
	var pass = document.getElementById("password");
	if(user.value == "ivan" && pass.value == "ivan"){
		window.location.href="#menuProfesor";
	} 
}

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