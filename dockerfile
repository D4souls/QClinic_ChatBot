# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo en la raíz de la aplicación
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto en el que se ejecutará tu aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
