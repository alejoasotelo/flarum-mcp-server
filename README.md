# flarum-mcp-server

Servidor MCP (Middleware Connection Point) para integrar Flarum (foro) con sistemas de Inteligencia Artificial.

## Objetivo

Permitir que tu foro Flarum interactúe fácilmente con sistemas de IA, mediante una API y arquitectura extensible. El objetivo es que puedas levantar este servidor vía Docker y personalizar integraciones de IA desde tu entorno de desarrollo (por ejemplo, VS Code).

## Características iniciales

- Servidor Node.js básico listo para extender.
- Configuración simple con Docker y Docker Compose.
- Estructura preparada para conectar con Flarum y futuras IA.
- Código abierto bajo licencia MIT.

## Uso rápido

```
git clone https://github.com/alejoasotelo/flarum-mcp-server.git
cd flarum-mcp-server
docker-compose up
```

Luego accede a http://localhost:3000 para ver si el servidor responde.

## Estructura sugerida

- `/src` - Código fuente principal del servidor
- `/src/integrations` - Lugar para agregar integraciones con IA y Flarum
- `/config` - Archivos de configuración

## Próximos pasos

1. Implementar endpoints de ejemplo.
2. Agregar integración real con Flarum y IA.
3. Mejorar la documentación y la configuración.

¡Pull Requests y sugerencias son bienvenidas!