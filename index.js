// index.js
// Parte 1: primer script de Node.js - prueba de funcionamiento desde terminal

const nombre = "Maximiliano";
const materia = "Construcción de software y toma de decisiones";

function saludar(nombre) {
    return `Hola, ${nombre}. Bienvenido a Node.js.`;
}

console.log(saludar(nombre));
console.log(`Curso actual: ${materia}`);

const numeros = [1, 2, 3, 4, 5];
const suma = numeros.reduce((acumulado, actual) => acumulado + actual, 0);
console.log(`La suma de [${numeros.join(", ")}] es ${suma}`);

for (let i = 1; i <= 3; i++) {
    console.log(`Iteración número ${i}`);
}
