# Servidor MCP para Flarum

Este proyecto es una implementación de servidor para el Protocolo de Contexto de Modelo (MCP) que interactúa con una instancia de foro Flarum. Proporciona herramientas para obtener discusiones, obtener publicaciones, crear publicaciones, actualizar publicaciones y eliminar publicaciones en un foro Flarum.

## Instrucciones de Configuración

### 1. Configurar Variables de Entorno

Cree un archivo `.env` en el directorio raíz del proyecto y copie el contenido de `.env.dist` en él. Luego, actualice los valores con los detalles de su instancia de Flarum.

Ejemplo de archivo `.env`:
```
FLARUM_API_BASE=https://your-flarum-instance.com/api
FLARUM_API_KEY=your-flarum-api-key
```

### 2. Instalar Dependencias

Ejecute el siguiente comando para instalar las dependencias del proyecto:

```
npm install
```

### 3. Construir el Proyecto

Ejecute el siguiente comando para construir el proyecto:

```
npm run build
```

### 4. Ejecutar el Servidor

Ejecute el siguiente comando para iniciar el servidor:

```
node build/index.js
```

El servidor se iniciará y escuchará las solicitudes entrantes.
