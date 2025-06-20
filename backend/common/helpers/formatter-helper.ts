export function formatCurrency(value: number | string): string {
  const numberValue = typeof value === 'string' ? 
    parseFloat(value) : 
    value;
  
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(numberValue);
}



export function formatPercentage(value: number | string): string {
  // Convertir a número si es string
  const numberValue = typeof value === 'string' ? 
    parseFloat(value) : 
    value;
  
  // Validar que sea un número válido
  if (isNaN(numberValue)) {
    return '0%';
  }
  
  // Formatear con separador decimal de coma
  return new Intl.NumberFormat('es-AR', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numberValue / 100);
}



// Método para formatear fechas con hora
export function formatDateTime(date: Date): string {
  const d = new Date(date);
  
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}



