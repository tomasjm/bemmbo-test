# Sistema de Gestión de Facturas - Frontend

Buenas, creo que completé la tarea + todos los desafios o bonus que se mencionaban (si es que está todo bien)

## 🚀 Demo en Vivo

La aplicación está desplegada en Vercel:
**https://bemmbo-test.vercel.app/**


## 🛠️ Stack Tecnológico

### Frontend Framework
- **React 18** con **TypeScript** para type safety
- **Vite** como bundler y herramienta de desarrollo

### Gestión de Estado
- **Zustand** - Store ligero y potente
  - Ventajas: Soporte nativo para funciones asíncronas sin middleware adicional
  - Sin providers necesarios, menos boilerplate que Redux (a mi gusto, no lo ocupo hace harto igual)
- **React Query (no incluido)** 
  - Quisiera haber usado react query ya que ahorra harta pega de gestionar estados en el lado del cliente (básicamente es como una store global en el cliente del estado del servidor o de los fetch) y delega más al servidor en este caso.

### UI/UX
- **RadixUI** - Componentes headless accesibles y robustos
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/ui** - Componentes pre-estilizados con Radix + Tailwind
- **Lucide React** - Iconografía moderna y consistente

### Tablas y Datos
- **@tanstack/react-table** - Librería potente para tablas complejas
  - Manejo eficiente de grandes volúmenes de datos
  - Funcionalidades avanzadas: filtros, ordenamiento, paginación, selección

## 🏗️ Arquitectura del Proyecto


### Estructura de Carpetas

```
src/
├── components/
│   ├── ui/              # Componentes base reutilizables
│   │   ├── card.tsx     # Componente Card
│   │   ├── dialog.tsx   # Modales y diálogos
│   │   ├── table.tsx    # Componentes de tabla base
│   │   └── ...
│   └── invoices/        # Componentes específicos de facturas
│       ├── table/       # Lógica específica de tablas
│       │   ├── invoice-data-table.tsx
│       │   └── invoice-table-columns.tsx
│       ├── invoice-progress.tsx
│       └── ...
├── store/               # Gestión de estado global
│   └── invoices.store.ts
├── lib/                 # Utilidades y servicios
│   ├── requests.ts      # API calls
│   └── utils.ts         # Funciones auxiliares
└── types.ts            # Definiciones de tipos TypeScript
```
1. **Separación de responsabilidades**:
   - `components/ui/`: Componentes genéricos y reutilizables
   - `components/invoices/`: Lógica específica del dominio o feature que se trabajó
   - `store/`: Estado global centralizado con zustand


## 🚀 Configuración y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

### Construcción
```bash
npm run build
```

### Linting
```bash
npm run lint
```
