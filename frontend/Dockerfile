# Etapa 1: Usar una imagen de Node para instalar dependencias y construir la app
# Se usa la versión LTS (Long Term Support) de Node. Es una buena práctica.
FROM node:18-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Comando para servir la aplicación en modo desarrollo
# expone la app en el puerto 4200 y la hace accesible desde fuera del contenedor
# Ejecuta el comando a través de npm para que encuentre el Angular CLI correctamente
CMD ["npm", "start"]