export function getMethodName(): string {
    // 1. Crear un error para obtener el stack trace y separar en lineas
    const stackTrace = new Error().stack || '';
    const stackLines = stackTrace.split('\n');

    // 2. Obtener la línea del método que llama
    // [0] Error
    // [1] getMethodName
    // [2] lugar donde se llamó a getMethodName 
    const callerLine = stackLines[2]?.trim();

    // 3. Verifica coincidencia de linea
    const match = callerLine?.match(/^at\s+(.*)\s+\(/); // Ejemplo de línea: at MiServicio.ejecutarAlgo (mi-servicio.ts:12:7)"

    //4. Extraer el nombre del sino devolver unknown 
    return match?.[1] ?? 'unknownMethod';
}
