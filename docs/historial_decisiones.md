# Historial de Desarrollo y Decisiones Técnicas

Este documento resume el proceso de co-creación del proyecto **IU Digital Cinema**, detallando las decisiones clave tomadas durante la colaboración.

## 🤝 Resumen del Proceso
El desarrollo se llevó a cabo en 4 fases principales, centradas en la transformación de un backend monolítico a una arquitectura desacoplada y profesional.

1. **Análisis:** Se evaluó el repositorio original `APP-Pelis`, identificando áreas de mejora en nomenclatura y estructura.
2. **Refactorización del Backend:** Se implementó una **Arquitectura en Capas** (Routes, Controllers, Services, Models) en Node.js, separando la lógica de negocio del acceso a datos.
3. **Desarrollo del Frontend:** Se construyó una SPA con **ReactJS + Vite**, utilizando **Bootstrap 5** para un diseño responsivo y "Cinema-dark".
4. **Branding y Funciones Pro:** Se integró la identidad visual del cliente y se habilitaron las funciones de **Edición (Update)** y **Eliminado (Delete)** en todos los módulos.

---

## 📐 Decisiones de Arquitectura

### 1. Separación de Responsabilidades
- **Backend:** Puerto 3000. Responsable únicamente de la persistencia y reglas de negocio. No contiene lógica de UI.
- **Frontend:** Puerto 5173. Gestión de estado, ruteo dinámico y presentación estética.

### 2. Estándares de Código
- **Variables/Funciones:** `camelCase` (ej. `listarGeneros`).
- **Componentes/Modelos:** `PascalCase` (ej. `MediaView`, `Genero`).
- **Archivos:** `kebab-case` para componentes (ej. `header.jsx`).
- **Nombres Semánticos:** Se evitaron nombres genéricos, prefiriendo verbos para funciones y sufijos de rol (`Controller`, `Service`).

### 3. Validaciones de Integridad
- Durante la creación de una producción (`Media`), el sistema valida que los recursos relacionados (Géneros, Directores, etc.) estén en estado **"Activo"** antes de permitir la asociación.

---

## 🛠️ Herramientas Utilizadas
- **Runtime:** Node.js v20+
- **BD:** MongoDB Atlas
- **Frontend:** React 18+, React Router 6+, Bootstrap 5.
- **Build Tool:** Vite (elegido por su rendimiento superior DX).

---

## 📝 Notas Finales
Se ha dejado un entorno listo para producción, con variables de entorno gestionadas por `.env` y una estructura escalable preparada para añadir nuevos módulos en el futuro.

*Desarrollado en colaboración con Cortex Agent - Marzo 2026. *
