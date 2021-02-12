var mostrar
var operando1, operando2, resultado;
var sumando, restando, multiplicando, dividiendo, porcien = false;

function añadirValor(valorBoton) {
    //Esta variable la usaremos a través de todo el programa para ajustar lo que se muestra
    //en pantalla
    mostrar = document.getElementById("pantalla");

    //Con este switch leeremos el botón pulsado, y según su valor, haremos una acción u otra
    switch (valorBoton) {
        case '0':
            maxSize();
            //Si la pantalla muestra un 0, impediremos que se puedan añadir más ceros.
            if (mostrar.value == "0") {
                mostrar.value = "0";
            } else {
                mostrar.value = mostrar.value + "0";
            }
            break;

        case 'C':
            maxSize();
            //Se reiniciarán la pantalla y las variables bool
            mostrar.value = "";

            sumando = false;
            restando = false;
            multiplicando = false;
            dividiendo = false;
            break;

        case '.':
            //Controlamos que si hay un punto, si existe no pondremos mas, si no, nos permitirá poner uno
            if (mostrar.value === "") {
                mostrar.value = "";
            } else {
                if (maxSize()) {
                    mostrar.value = mostrar.value;
                } else {
                    if (mostrar.value.includes(".") && valorBoton === ".") {
                        //No añade el '.'
                    }
                    else {
                        mostrar.value = mostrar.value + ".";
                    }
                }
            }
            break;

        case '+':
            operando1 = Number(mostrar.value);
            mostrar.value = "";

            //Activamos el booleano de sumar
            sumando = true;
            restando = false;
            multiplicando = false;
            dividiendo = false;
            break;
        case '-':
            operando1 = Number(mostrar.value);
            mostrar.value = "";

            //Activamos el booleano de restar
            sumando = false;
            restando = true;
            multiplicando = false;
            dividiendo = false;
            break;

        case '÷':
            operando1 = Number(mostrar.value);
            mostrar.value = "";

            //Activamos el booleano de dividir
            sumando = false;
            restando = false;
            multiplicando = false;
            dividiendo = true;
            break;

        case 'x':
            operando1 = Number(mostrar.value);
            mostrar.value = "";

            //Activamos el booleano de multiplicar
            sumando = false;
            restando = false;
            multiplicando = true;
            dividiendo = false;
            break;

        case '±':
            operando1 = Number(mostrar.value);

            //Si el numero es menor que cero, lo transformamos en positivo, si no, le añadimos '-'
            //para hacerlo negativo
            if (operando1 < 0) {
                mostrar.value = Math.abs(operando1);
            } else {
                mostrar.value = "-" + mostrar.value;
            }
            break;

        case '√':
            operando1 = Number(mostrar.value);

            mostrar.value = Math.sqrt(operando1);
            break;

        case '%':
            //Esto funciona de la siguiente manera
            //El programa recogerá un primer valor que será el porcentaje que quieres aplicarle
            //a un número. Después al pulsar el botón %, se introduce un segundo número, al cual 
            //se le aplicará el porcentaje introducido anteriormente. Ej. Primer número = 20
            //Segundo número = 100. Se realizaría el 20% de 100 al pulsar =

            operando1 = Number(mostrar.value);
            mostrar.value = "";

            sumando = false;
            restando = false;
            multiplicando = false;
            dividiendo = false;
            porcien = true;
            break;

        case '1/x':
            operando1 = Number(mostrar.value);

            mostrar.value = 1 / operando1;
            break;

        case '=':
            operando2 = Number(mostrar.value);

            if (sumando) {
                resultado = operando1 + operando2;
                mostrar.value = resultado;
            }
            else if (restando) {
                resultado = operando1 - operando2;
                mostrar.value = resultado;
            }
            else if (multiplicando) {
                resultado = operando1 * operando2;
                mostrar.value = resultado;
            }
            else if (dividiendo) {
                resultado = operando1 / operando2;
                mostrar.value = resultado;
            }
            else if (porcien) {
                resultado = operando1 * operando2 / 100;
                mostrar.value = resultado;
            }

            operando1 = "";
            operando2 = "";
            resultado = "";
            break;

        default:
            if (mostrar.value === "0") {
                mostrar.value = "";
            }
            if (maxSize()) {
                mostrar.value = mostrar.value;
            } else {
                mostrar.value = mostrar.value + valorBoton;
            }
            break;
    }
}

function maxSize() {
    if (document.getElementById("pantalla").value.length >= 13) {
        return true
    }
}