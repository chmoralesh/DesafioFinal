---
name: estructura-proyecto
description: >-
  Convención de arquitectura y carpetas para proyectos full-stack con React +
  Express + PostgreSQL + MQTT. Úsala al crear archivos, ubicar código nuevo o
  razonar sobre la estructura de este tipo de proyectos (frontend React/Vite,
  backend Express en 3 capas routes/controllers/models, PostgreSQL con pg,
  autenticación JWT, tiempo real con Socket.IO y comunicación IoT vía MQTT).
---

# Convención de proyectos full-stack (React + Express + PostgreSQL + MQTT)

Trabajas en proyectos que siguen SIEMPRE la misma arquitectura y convención de
carpetas. Respeta esta estructura al crear archivos, ubicar código nuevo y
razonar sobre el proyecto.

## Stack tecnológico

**Frontend**
- React 19 con Vite
- React Router DOM 7 (rutas + modales con `backgroundLocation`)
- Bootstrap 5 + React-Bootstrap (UI)
- SweetAlert2 (alertas/modales de confirmación)
- socket.io-client (datos en tiempo real vía WebSocket)
- Estado global con Context API (NO Redux)

**Backend**
- Node.js con Express 4 (ESM: `"type": "module"`)
- PostgreSQL con `pg` (Pool) — SQL parametrizado siempre (`$1, $2...`)
- `pg-format` para queries dinámicas
- Autenticación con JWT (`jsonwebtoken`) + bcryptjs para hash de contraseñas
- socket.io (servidor WebSocket)
- MQTT (`mqtt`) para comunicación con hardware/IoT
- `dotenv` para variables de entorno
- `nodemon` en desarrollo

**Capa IoT (cuando aplica)**
- Broker MQTT + Node-RED como edge + PLC (ej. Siemens S7-1200)

## Estructura de carpetas

```
proyecto/
├── Readme.md
├── backend/
│   ├── server.js                 # Entry point: Express + Socket.IO + arranque
│   ├── package.json
│   ├── .env.local                # Variables de entorno (NUNCA commitear)
│   ├── .gitignore
│   ├── db/
│   │   ├── config.js             # Pool de conexión PostgreSQL
│   │   └── schema/
│   │       ├── DDL.sql           # Definición de tablas (CREATE)
│   │       └── DML.sql           # Datos semilla (INSERT)
│   ├── routes/                   # Definición de endpoints (Router de Express)
│   │   └── *.routes.js
│   ├── middlewares/              # Auth, verificación de token, validaciones
│   │   └── *.middleware.js
│   └── src/
│       ├── controllers/          # Lógica de request/response (recibe req/res)
│       │   └── *.controller.js
│       ├── models/               # Acceso a datos: queries SQL a la BD
│       │   └── *.model.js
│       ├── services/             # Servicios externos (MQTT, etc.)
│       │   └── *.js
│       └── helpers/              # Utilidades (hateoas, formateo, etc.)
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx              # Punto de montaje + Providers globales
        ├── App.jsx               # Rutas (React Router) + layout
        ├── index.css / App.css
        ├── components/           # Componentes reutilizables (+ su .css al lado)
        ├── pages/                # Vistas por ruta (+ su .css al lado)
        ├── contexts/             # Context API (Token, User, Cart, WebSocket...)
        ├── hooks/                # Custom hooks (useProfile, etc.)
        ├── utils/                # Utilidades (formateo, cálculos, reloj...)
        └── assets/img/           # Imágenes y recursos estáticos
```

## Reglas y convenciones

1. **Patrón backend en 3 capas** — respétalo estrictamente:
   - `routes/` define la ruta y llama al controlador.
   - `controllers/` maneja `req`/`res`, valida entrada y responde. NO consulta la BD directamente.
   - `models/` contiene TODA la interacción SQL con la BD. Devuelve datos, no maneja `req`/`res`.
   - Servicios externos (MQTT, etc.) van en `src/services/`.

2. **Nomenclatura de archivos:**
   - Backend: `nombre.routes.js`, `nombre.controller.js`, `nombre.model.js`, `nombre.middleware.js`.
   - Frontend: componentes y páginas en PascalCase (`Navbar.jsx`, `Login.jsx`), cada uno con su `.css` del mismo nombre al lado.

3. **Base de datos:**
   - Siempre SQL parametrizado (`$1, $2...`), nunca concatenar strings.
   - Conexión centralizada en `db/config.js` vía `pg.Pool`.
   - El esquema vive en `db/schema/DDL.sql` (estructura) y `DML.sql` (datos).

4. **Autenticación:**
   - Login genera JWT; el middleware `verifyToken` valida el header `authorization: Bearer <token>`.
   - Rutas que crean, modifican o eliminan datos DEBEN protegerse con el middleware de token.
   - Contraseñas siempre hasheadas con bcryptjs, nunca en texto plano.

5. **Tiempo real:**
   - El backend emite eventos vía Socket.IO (ej. `updateAlarmas`).
   - El frontend consume vía un Context Provider de WebSocket (`contexts/WebSocketProvider.jsx`).
   - Prefiere emitir por eventos (cuando llega dato nuevo) en lugar de polling por intervalo.

6. **Estado en frontend:**
   - Se usa Context API para estado global (auth/token, usuario, carrito, websocket).
   - Los providers se montan en `main.jsx`, envolviendo `<App />`.

7. **Variables de entorno:**
   - Backend: `.env.local` (DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, JWT_SECRET).
   - Frontend: variables `VITE_*` (ej. `VITE_API_URL`, `VITE_API_WS`) accedidas con `import.meta.env`.
   - NUNCA commitear archivos `.env*` con secretos; deben estar en `.gitignore`.

## Al crear código nuevo

- Un nuevo recurso/endpoint requiere típicamente los 3 archivos: `routes/`, `controllers/`, `models/`.
- Una nueva vista va en `pages/` + su `.css`; un elemento reutilizable en `components/`.
- Idioma: código y comentarios en español (nombres de variables pueden ser en inglés).
- Mantén la consistencia con el código existente antes que introducir nuevas librerías o patrones.
