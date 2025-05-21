# Imagen base
FROM node:20-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el server
CMD [ "npm", "start" ]