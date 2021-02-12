//Esta es la clase que usaremos a la hora de crear las entradas en la agenda
class Persona {
	constructor(nombre, apellidos, telefono, fecha) {
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.telefono = telefono;
		this.fecha = fecha;
	}

	//Gets de la clase Persona
	get getNombre() {
		return this.nombre;
	}

	get getApellidos() {
		return this.apellidos;
	}

	get getTelefono() {
		return this.telefono;
	}

	get getFecha() {
		return this.fecha;
	}
}

//Variables ------------------------------
var listaPersonas = [];
//Inicializamos la variable de personas en 4 porque ya existen datos que he introducido de ejemplo
var contadorPersonas = 4;
var contadorRegistros = 0;

function iniciar() {

	//Creamos objetos de la clase Persona para tener como ejemplo en el ejercicio y los añadimos
	//a su array correspondiente
	var persona = new Persona("", "", "", "");
	listaPersonas.push(persona);

	var persona = new Persona("Adrián", "Romero Torres", "666666666", "02/03/1995");
	listaPersonas.push(persona);

	var persona = new Persona("Manolo", "Pérez Pérez", "334445556", "15/12/1988");
	listaPersonas.push(persona);

	var persona = new Persona("Lucía", "García Gómez", "908837737", "01/01/2001");
	listaPersonas.push(persona);

	//Estos objetos los introduciremos en la tabla mediante la funcion nuevaLineaTabla
	nuevaLineaTabla(1);
	nuevaLineaTabla(2);
	nuevaLineaTabla(3);
	actualizarRegistro();

	//Deshabilitamos los botones necesarios para el inicio del programa
	nombre.disabled = true;
	apellidos.disabled = true;
	telefono.disabled = true;
	fecha.disabled = true;
	btnGuardar.disabled = true;
	anteriorRegistro.disabled = true;
	primerRegistro.disabled = true;
	//siguienteRegistro.disabled = true;
	//ultimoRegistro.disabled = true;

	//Listeners de los botones
	btnGuardar.addEventListener('click', function () { funcionGuardar() });
	btnLimpiar.addEventListener('click', function () { funcionLimpiar() });
	btnNuevo.addEventListener('click', function () { funcionNuevo() });
	primerRegistro.addEventListener('click', function () { funcionPrimerRegistro() });
	anteriorRegistro.addEventListener('click', function () { funcionAnteriorRegistro() });
	siguienteRegistro.addEventListener('click', function () { funcionSiguienteRegistro() });
	ultimoRegistro.addEventListener('click', function () { funcionUltimoRegistro() });
	buscar.addEventListener('click', function () { funcionBuscar() });

}

function funcionLimpiar() {
	limpiarValores();

	//Si tenemos en el registro al menos una persona, habilitamos los botones de "siguiente"
	if (listaPersonas.length > 0) {
		siguienteRegistro.disabled = false;
		ultimoRegistro.disabled = false;
	}

	//Devolvemos el contador de los registros a 0 y deshabilitamos los botones de "anterior"
	contadorRegistros = 0;
	anteriorRegistro.disabled = true;
	primerRegistro.disabled = true;
	actualizarRegistro();
}

function funcionGuardar() {
	//Creamos un objeto de la clase Persona, pasandole los valores introducidos en los campos de texto
	//y los metemos en el array
	var regexpNombre = /[a-zA-Z \u00C0-\u024F\u1E00-\u1EFF]+/i;
	var regexpApellidos = /[a-zA-Z \u00C0-\u024F\u1E00-\u1EFF]+/i;
	var regexpTelefono = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;
	var regExpFecha = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

	//Evaluamos los campos para ver si son correctos
	if (regexpNombre.test(nombre.value) && regexpApellidos.test(apellidos.value) && regexpTelefono.test(telefono.value) && regExpFecha.test(fecha.value)) {
		var persona = new Persona(nombre.value, apellidos.value, telefono.value, fecha.value);
		listaPersonas.push(persona);

		//Llamamos al método de introducir los datos en la tabla
		nuevaLineaTabla(contadorPersonas);

		//Reiniciamos los valores según lo necesario (botones, campos de texto, etc)
		limpiarValores();
		restaurarBotones();

		nombre.disabled = true;
		apellidos.disabled = true;
		telefono.disabled = true;
		fecha.disabled = true;

		btnNuevo.textContent = "Nuevo"

		if (listaPersonas.length > 0) {
			siguienteRegistro.disabled = false;
			ultimoRegistro.disabled = false;
		}
		contadorRegistros = 0;
		anteriorRegistro.disabled = true;
		primerRegistro.disabled = true;

		errorNombre.textContent = "";
		errorApellidos.textContent = "";
		errorTelefono.textContent = "";
		errorFecha.textContent = "";

		//Sumamos una persona a la variable contadorPersonas y actualizamos etiquetas según corresponda
		contadorPersonas++;
		totalRegistros.textContent = "Total registros = " + (listaPersonas.length - 1);
		numeroRegistros.textContent = 0 + " de " + (listaPersonas.length - 1);
	} else {
		//Cuando falle la expresion regular daremos un mensaje de error según donde falle
		if (regexpNombre.test(nombre.value) == false) {
			errorNombre.textContent = "Nombre introducido inválido";
		} else {
			errorNombre.textContent = "";
		}

		if (regexpApellidos.test(apellidos.value) == false) {
			errorApellidos.textContent = "Apellidos introducidos inválidos";
		} else {
			errorApellidos.textContent = "";
		}

		if (regexpTelefono.test(telefono.value) == false) {
			errorTelefono.textContent = "Teléfono introducido inválido";
		} else {
			errorTelefono.textContent = "";
		}

		if (regExpFecha.test(fecha.value) == false) {
			errorFecha.textContent = "Fecha introducida inválida";
		} else {
			errorFecha.textContent = "";
		}
	}
}

function funcionNuevo() {
	//Este botón tiene la funcionalidad de cambiar según la funcion. Si has pulsado Nuevo, estarás 
	//a la espera a que añadas un nuevo campo. En este momento el botón pasará a llamarse "Cancelar"
	//Si pulsas cancelar, volver a ser "nuevo" y ya no esperará a que metas un campo nuevo
	if (btnNuevo.textContent == "Nuevo") {
		limpiarValores();
		nombre.disabled = false;
		apellidos.disabled = false;
		telefono.disabled = false;
		fecha.disabled = false;

		btnGuardar.disabled = false;
		buscar.disabled = true;

		errorNombre.textContent = "";
		errorApellidos.textContent = "";
		errorTelefono.textContent = "";
		errorFecha.textContent = "";
		btnNuevo.textContent = "Cancelar";
	} else {
		funcionCancelar();
	}
}

function funcionCancelar() {
	limpiarValores();
	restaurarBotones();
	errorNombre.textContent = "";
	errorApellidos.textContent = "";
	errorTelefono.textContent = "";
	errorFecha.textContent = "";

	nombre.disabled = true;
	apellidos.disabled = true;
	telefono.disabled = true;
	fecha.disabled = true;

	btnNuevo.textContent = "Nuevo"
}


function funcionPrimerRegistro() {

	//Si el contador es 0 no haremos nada (lo que querrá decir que ya estamos en el primer registro)
	//si no es 0 lo pondremos en 0 para que vaya al primer registro
	if (contadorRegistros == 0) {
		//Nada
	} else {
		contadorRegistros = 0;
	}

	//Asignamos los datos del registro pertinente a los campos de texto
	nombre.value = listaPersonas[contadorRegistros].getNombre;
	apellidos.value = listaPersonas[contadorRegistros].getApellidos;
	telefono.value = listaPersonas[contadorRegistros].getTelefono;
	fecha.value = listaPersonas[contadorRegistros].getFecha;

	primerRegistro.disabled = true;
	anteriorRegistro.disabled = true;
	siguienteRegistro.disabled = false;
	ultimoRegistro.disabled = false;
	actualizarRegistro();
}

function funcionAnteriorRegistro() {

	//Si contador es 0, quiere decir que no vamos a bajar mas.
	//Si no es cero le bajamos uno al contador para que vaya al registro anterior
	if (contadorRegistros == 0) {
		//Nada
	} else {
		contadorRegistros--
	}

	//Asignamos los datos del registro pertinente a los campos de texto
	nombre.value = listaPersonas[contadorRegistros].getNombre;
	apellidos.value = listaPersonas[contadorRegistros].getApellidos;
	telefono.value = listaPersonas[contadorRegistros].getTelefono;
	fecha.value = listaPersonas[contadorRegistros].getFecha;

	if (contadorRegistros == 0) {
		primerRegistro.disabled = true;
		anteriorRegistro.disabled = true;
	}

	if (contadorRegistros < (listaPersonas.length - 1)) {
		siguienteRegistro.disabled = false;
		ultimoRegistro.disabled = false;
	}
	actualizarRegistro();
}

function funcionSiguienteRegistro() {

	//Si contador es del tamaño del array, quiere decir que no vamos a subir mas.
	//Si no es del tamaño del array le subimos uno al contador para que vaya al registro siguiente
	if (contadorRegistros == (listaPersonas.length - 1)) {
		//Nada
	} else {
		contadorRegistros++
	}

	//Asignamos los datos del registro pertinente a los campos de texto
	nombre.value = listaPersonas[contadorRegistros].getNombre;
	apellidos.value = listaPersonas[contadorRegistros].getApellidos;
	telefono.value = listaPersonas[contadorRegistros].getTelefono;
	fecha.value = listaPersonas[contadorRegistros].getFecha;

	if (contadorRegistros == (listaPersonas.length - 1)) {
		siguienteRegistro.disabled = true;
		ultimoRegistro.disabled = true;
	} else {
		primerRegistro.disabled = false;
		anteriorRegistro.disabled = false;
	}
	actualizarRegistro();
}

function funcionUltimoRegistro() {

	//Si el contador es del tamaño del array no haremos nada (lo que querrá decir que ya estamos en el ultimo
	//registro) si no es del tamaño del array lo pondremos en ese valor para que vaya al ultimo registro
	if (contadorRegistros == (listaPersonas.length - 1)) {
		//Nada
	} else {
		contadorRegistros = listaPersonas.length - 1;
	}

	//Asignamos los datos del registro pertinente a los campos de texto
	nombre.value = listaPersonas[contadorRegistros].getNombre;
	apellidos.value = listaPersonas[contadorRegistros].getApellidos;
	telefono.value = listaPersonas[contadorRegistros].getTelefono;
	fecha.value = listaPersonas[contadorRegistros].getFecha;

	primerRegistro.disabled = false;
	anteriorRegistro.disabled = false;
	siguienteRegistro.disabled = true;
	ultimoRegistro.disabled = true;
	actualizarRegistro();
}

function funcionBuscar() {
	contadorRegistros = busc.value;

	//Controlamos el contenido del campo buscar para que no falle
	if (contadorRegistros > (listaPersonas.length - 1) || contadorRegistros < 0 || contadorRegistros == "") {
		//Nada
	} else {
		nombre.value = listaPersonas[contadorRegistros].getNombre;
		apellidos.value = listaPersonas[contadorRegistros].getApellidos;
		telefono.value = listaPersonas[contadorRegistros].getTelefono;
		fecha.value = listaPersonas[contadorRegistros].getFecha;

		busc.value = "";
		actualizarRegistro();
	}

	//Control de los botones
	if (contadorRegistros > 0) {
		anteriorRegistro.disabled = false;
		primerRegistro.disabled = false;
	} else {
		anteriorRegistro.disabled = true;
		primerRegistro.disabled = true;
	}

	if (contadorRegistros < (listaPersonas.length - 1)) {
		siguienteRegistro.disabled = false;
		ultimoRegistro.disabled = false;
	} else {
		siguienteRegistro.disabled = true;
		ultimoRegistro.disabled = true;
	}
}

function limpiarValores() {
	nombre.value = "";
	apellidos.value = "";
	telefono.value = "";
	fecha.value = "";
}

function restaurarBotones() {
	btnGuardar.disabled = true;
	buscar.disabled = false;
}

function actualizarRegistro() {
	numeroRegistros.textContent = contadorRegistros + " de " + (listaPersonas.length - 1);
}

function nuevaLineaTabla(contadorPersonas) {
	var nuevaLinea = miTabla.insertRow(miTabla.rows.length);

	var nuevoCampo1 = nuevaLinea.insertCell(0);
	var setNombre = document.createTextNode(listaPersonas[contadorPersonas].getNombre)
	nuevoCampo1.appendChild(setNombre);

	var nuevoCampo2 = nuevaLinea.insertCell(1);
	var setApellidos = document.createTextNode(listaPersonas[contadorPersonas].getApellidos)
	nuevoCampo2.appendChild(setApellidos);

	var nuevoCampo3 = nuevaLinea.insertCell(2);
	var setTelefono = document.createTextNode(listaPersonas[contadorPersonas].getTelefono)
	nuevoCampo3.appendChild(setTelefono);

	var nuevoCampo4 = nuevaLinea.insertCell(3);
	var setFecha = document.createTextNode(listaPersonas[contadorPersonas].getFecha)
	nuevoCampo4.appendChild(setFecha);
}