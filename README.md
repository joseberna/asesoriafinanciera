# Asesoría Financiera - Conferencia Web3 & Soberanía Digital

SPA (Single Page Application) desarrollada en React.js orientada a ser el material interactivo para una conferencia sobre finanzas descentralizadas.

## Stack Tecnológico 💻
- React.js (Hooks, Context API)
- Vite (Empaquetador ultrarrápido)
- Tailwind CSS v4 (Estilos atómicos y variables de tema)
- Framer Motion (Animaciones interactivas nivel producción)
- Recharts (Gráficos DCA)
- Lucide React (Íconos vectoriales)

## Ejecución Local y DevOps 🛠️
```bash
# Instalar dependencias
npm install o pnpm install

# Iniciar servidor de desarrollo
npm run dev

# Generar CLI para construir la app
npm run build
```

### 🚀 Despliegue en Producción (Vercel)
Este proyecto está optimizado con las mejores prácticas CI/CD para ser desplegado instantáneamente en **Vercel**. 
Cuenta con el archivo `vercel.json` autoconfigurado que garantiza:
- **Clean URLs:** Eliminación de extensiones `.html` para mejor SEO.
- **SPA Rewrites:** Mapeo de sub-rutas `/(.*)` nativo a `/index.html` sin crashear el Router al refrescar.
- **Cache Invalidation:** Header Cache-Control agresivo (`immutable`) optimizando la carga de Assets de Vite al máximo y ahorrando ancho de banda.

**Pasos Rápidos:**
1. Sube tu código a un repositorio en GitHub.
2. Ingresa a `vercel.com/new` y conecta el repositorio.
3. El *Build Command* (`npm run build`) y *Output Directory* (`dist`) se detectan automáticamente.
4. Despliega con 1 solo click.

## Features Principales 🚀

### 1. Sistema de Evaluación Atómico (`InteractiveQuiz`)
- **Centralización Lógica**: Un solo componente gestiona la aleatoriedad, calificación y revelación de respuestas para todos los módulos.
- **Banco de Preguntas SEO**: Base de datos de 20 preguntas por tema filtradas estratégicamente para posicionamiento orgánico (Halving, Ciclos, Riesgo).
- **UX Gamificada**: Animaciones fluidas con Framer Motion y retroalimentación visual inmediata según el puntaje.

### 2. Módulo de Ecosistema Digital & Halving
- **Simulador de Halving**: Animación interactiva que explica la reducción de la oferta y su impacto en el precio.
- **Reloj de Ciclos de Bitcoin**: Visualización de las 4 fases del mercado (Acumulación, Bull Market, Distribución, Bear Market) con tooltips educativos institucionales.
- **Verificación PAXG (Redux)**: Integración con la API de Paxos para validar el respaldo en oro físico de direcciones Ethereum en tiempo real.

### 3. Ingeniería Financiera Interactiva
- **Calculadora de Inflación**: Herramienta visual para demostrar la pérdida de poder adquisitivo del dinero fiat.
- **Simulador de Liquidación (Leverage)**: Modelo matemático que educa sobre los riesgos del apalancamiento y niveles de margin call.
- **DCA Master Visualizer**: Gráficos multivariable que comparan el precio promedio de compra frente a la volatilidad del mercado mediante Recharts.

### 4. Internacionalización Dinámica (i18n)
- Soporte completo para **Español, Inglés y Portugués** gestionado vía Context API, permitiendo cambios de idioma en caliente sin recargas de página.

## Patrones Arquitectónicos & Mejores Prácticas 🏗️
- **Atomic Design**: Componentes segregados (Átomos, Moléculas, Organismos) para una alta cohesión y bajo acoplamiento.
- **Clean Code**: Lógica de negocio (Hooks, Redux Thunks, Mappers) separada de la capa de presentación.
- **SEO-First Strategy**: Uso de etiquetas semánticas HTML5, jerarquía de encabezados optimizada y metadatos dinámicos por módulo.
- **Responsive Hiperelástico**: Layout adaptativo diseñado para dispositivos móviles y pantallas de proyección de alta resolución.
- **Seguridad y Performance**: Optimización de carga de assets a través de Vite yHeaders de cacheo immutable en Vercel.

---
*Desarrollado con enfoque en la educación financiera institucional y la soberanía digital.*
