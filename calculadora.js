let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

//Es obligatorio pasar siempre el event a la function!!!!
document.querySelector('.calc-buttons').addEventListener('click', function (event) {
    buttonClick(event.target.innerText);
});

//Comprobamos si el valor es un numero par amanejarlo
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

//Si el buffer es 0, el nuevo valor es el valor que entra por parámetro, si no lo añadimos al buffer
function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

/*
 * Manejamos los símbolos que enrten de la calculadora
 * Si es C, limpiamos todo
 * Si es =, comprobamos que el operador previo no sea nulo, si no lo es realizamos la operación y limpiamos todo excepto el buffer
 * Si es <- eliminamos el último carácter si el valor tiene un tamaño superior a 1.
 * Por defecto validamos la operación matemática.
*/
function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;

        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;

        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

//Parseamos el valor del buffer, lo pasamos a runningTotal si es igual a 0 y si no realizamos la operación
function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}

//Se realiza la operación matemática
function flushOperation(value){
    switch(previousOperator){
        case "+":
            runningTotal += value;
            break;
        case "-":
            runningTotal -= value;
            break;
        case "x":
            runningTotal *= value;
            break;
        case "÷":
            runningTotal /= value;
            break; 
    }
}

//Se pinta el valor por pantalla
function rerender() {
    screen.innerText = buffer;
}