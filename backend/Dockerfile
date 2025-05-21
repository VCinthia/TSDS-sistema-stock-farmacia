FROM node:18-alpine

WORKDIR /app

# Instala dependencias primero (caché eficiente)
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# El comando se sobrescribe en docker-compose.yml
CMD ["npm", "run", "start:prod"]  # Solo para producción
#CMD ["npm", "run", "start:dev"]