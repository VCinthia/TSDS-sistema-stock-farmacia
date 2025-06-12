export function getDateToday(): string {
const fecha = new Date();
const año = fecha.getFullYear();
const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // El mes comienza en 0
const dia = String(fecha.getDate()).padStart(2, '0');

const fechaFormateada = `${año}-${mes}-${dia}`;

return fechaFormateada;
}