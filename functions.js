function compAcceso(){
	var user = document.getElementById("nombre").value;
	var pass = document.getElementById("password").value;

}

function camposCursoAlumno(){
	var curso = document.getElementById("selCurso");
	var alumno = document.getElementById("selAlumno");
	var cursos = ['DAW', 'DAM'];
	var alumnos = [
		'Marcos Lopez', 'Arkaitz Huerta', 
		'Eneko irarragorri', 'Iván Martínez', 
		'Sergio Blasco'
	];
	//añadimos los diferentes cursos
	for(var a = 0;a<cursos.length;a++){
		var option = document.createElement("option");
		option.value=cursos[a];
		curso.appendChild(option);
	}
	//añadimos los diferentes alumnos
	for(var a = 0;a<alumnos.length;a++){
		var option = document.createElement("option");
		option.value=alumnos[a];
		curso.appendChild(option);
	}
}