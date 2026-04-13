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

## Patrones Arquitectónicos 🏗️
- **Atomic Design**: Componentes segregados por Átomos, Moléculas, Organismos y Plantillas para maximizar reusabilidad.
- **i18n Nativo**: Sistema de internacionalización mediante Contexto y diccionarios independientes.
- **Growth Hacking & UX**: Microinteracciones continuas, evaluaciones en tiempo real y componentes como *Tooltips* de alta retención.
- **Responsive-first**: Modificaciones condicionales con flex-box CSS para adaptarse a smartphones, tablets y pantallas de proyección anchas (AppLayout hiperelástico).
