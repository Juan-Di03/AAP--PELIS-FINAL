# Plan de Arquitectura FullStack: Proyecto Películas

## Reglas Arquitectónicas Obligatorias
> [!CAUTION]
> - **Separación Estricta:** El Backend NO debe contener código de interfaz. El Frontend NO debe contener lógica de base de datos.
> - **Comunicación Exclusiva:** 100% mediante tu API REST.
> - **Responsabilidad Única:** No mezclar rutas con lógica de negocio. No definir modelos dentro de controladores. No consultar la BD directamente en rutas.
> - **Modularidad:** Totalmente prohibido centralizar todo en un solo archivo.
> - **Estándares de Naming:**
>   - `camelCase`: Obligatorio en variables, funciones y métodos JS/Node.
>   - `PascalCase`: Obligatorio para clases, componentes React y modelos Mongoose.
>   - `UPPER_SNAKE_CASE`: Valores constantes inmutables.
>   - `kebab-case`: Nombres de archivos físicos (componentes Frontend, rutas).
> - **Semántica y Sintaxis:**
>   - Nombres descriptivos: Cero variables genéricas (`data`, `handle`). Funciones siempre con verbos (`calculateTaxReturn`).
>   - Booleanos: Prefijos de pregunta obligatorios (`isActive`, `hasToken`).
>   - Archivos Backend: Sufijos de responsabilidad obligatorios (`productController.js`, `authService.js`).
>   - Singular vs Plural:
>     - Modelos/Clases: Singular en `PascalCase` (`class User`).
>     - Instancias únicas: Singular en `camelCase` (`const user`).
>     - Colecciones/Listas: Plural en `camelCase` (`const users`).

## Análisis del Backend Actual (Hallazgos)
Tras clonar y analizar el repositorio `APP-Pelis`, encontré las siguientes oportunidades de mejora clave que aplicaremos en nuestra arquitectura:
1. **Inconsistencias de Nomenclatura:** Mezcla de mayúsculas y minúsculas en carpetas/archivos (`Routes` vs `models`, `Director.js` vs `genero.js`). Estandarizaremos todas las carpetas a minúsculas y nombres de archivo homogéneos.
2. **Arquitectura Acoplada (Controladores y Lógica):** `MediaController.js` y otros cuentan con la lógica de negocio y las validaciones fuertemente acopladas. Propongo aislar la base de datos en una capa de **Servicios**.
3. **Manejo de Errores y Validaciones:** Faltan validaciones unificadas (ej. con `express-validator`) y un middleware de respuesta para no repetir mensajes genéricos (`res.status(500)` sueltos).
4. **Errores Tipográficos Triviales pero Críticos:** En `db/db-conection-mongo.js`, la variable de entorno consultada es `process.env.MOBNGO_URI`, lo cual puede romper la ejecución si no se avisa previamente.

## User Review Required
> [!IMPORTANT]
> A continuación presento mi recomendación técnica. Necesito tu aprobación estricta para las arquitecturas propuestas de Frontend y Backend antes de crear o alterar archivos.

## Proposed Changes

### Backend (Node.js + Express) - Refactorización de Arquitectura
Usaremos principios de una Arquitectura en Capas:
- **Routes / Network:** Archivos encargados únicamente de definir el path y recibir el HTTP Request, pasándolo por validadores.
- **Controllers:** Orquestador. Llama a la capa inferior, maneja la respuesta y los HTTP status code.
- **Services:** Lógica pura de negocio (interactuará con los **Models** de Mongoose).
- Variables de entorno `.env` seguras (con `MONGO_URI`).

#### Estructura Propuesta:
```text
backend/
├── src/
│   ├── config/       (Instanciación de db y constantes)
│   ├── models/       (Esquemas Mongoose)
│   ├── routes/       (Ej. media.js, director.js)
│   ├── controllers/  (Ej. mediaController.js)
│   ├── services/     (Ej. mediaService.js [NUEVO])
│   ├── middlewares/  (Ej. validador de JWT/campos [NUEVO])
│   ├── app.js        (Configuración local del servidor Express)
│   └── index.js      (Arranque del servidor / Listen)
├── package.json
└── .env
```

### Frontend (ReactJS) - Componentes y Modularidad Reusable
Crearemos el cliente web desde cero, cuidando un diseño estético y premium (animaciones suaves, paletas oscuras "Cinema" que enamoren).
- **Herramienta de Build:** Vite (para mayor velocidad y DX frente a Webpack/CRA).
- **Estilos:** Se usará explícitamente el framework **Bootstrap** para un esquema ágil, responsivo y estandarizado.
- **Ruteo y Cliente HTTP:** `react-router-dom` y uso de `fetch`/`axios`.

#### Estructura Propuesta:
```text
frontend/
├── src/
│   ├── components/   (UI global: Header, Footer, Hero, Cards)
│   ├── features/     (Interfaces por dominio: /Media, /Generos)
│   ├── services/     (Llamados de red centralizados - Ej. mediaApi.js)
│   ├── styles/       (Variables globales en root y css resets)
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

## Verification Plan

### Automated Tests
- Ejecutaremos temporalmente comandos de `run_command` validando los endpoints refactorizados mediante logs sin romper la DB local persistente.
- Se asegurará la correcta importación sin errores de dependencias cíclicas (`SyntaxError` / dependencias caídas).

### Manual Verification
- Proporcionaré instrucciones precisas para que el usuario pueda levantar el back en `PORT=3000` y el front en el puerto local de Vite, garantizando que ambos se comunican a través de los CORS debidamente configurados.
