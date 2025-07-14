# 📁 Estructura del Proyecto Sweet Creations

Esta es la nueva estructura optimizada del proyecto Sweet Creations, organizada siguiendo las mejores prácticas de desarrollo.

## 🏗️ Estructura de Carpetas

```
sweet-creations/
├── 📱 app/                          # Expo Router - Navegación y pantallas
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx               # Importa HomeScreen desde src/
│   │   └── explore.tsx
│   ├── _layout.tsx
│   └── +not-found.tsx
│
├── 🎨 assets/                       # Recursos estáticos
│   ├── fonts/
│   └── images/
│
├── 🧩 components/                   # Componentes legacy (mantener para compatibilidad)
│   ├── ui/
│   ├── Collapsible.tsx
│   ├── ExternalLink.tsx
│   ├── HapticTab.tsx
│   ├── HelloWave.tsx
│   └── ParallaxScrollView.tsx
│
├── ⚙️ constants/                    # Constantes legacy
│   └── Colors.ts
│
├── 🎣 hooks/                        # Hooks personalizados
│   ├── useColorScheme.ts
│   ├── useColorScheme.web.ts
│   └── useThemeColor.ts
│
├── 📜 scripts/                      # Scripts de utilidad
│   └── reset-project.js
│
├── 🗂️ src/                          # Código fuente principal (NUEVA ESTRUCTURA)
│   ├── 🧩 components/              # Componentes organizados por funcionalidad
│   │   ├── common/                 # Componentes reutilizables
│   │   │   ├── ThemedText.tsx
│   │   │   ├── ThemedView.tsx
│   │   │   └── MemoizedThemedText.tsx
│   │   ├── store/                  # Componentes específicos de tiendas
│   │   │   ├── StoreCard.tsx
│   │   │   └── CategoryFilter.tsx
│   │   └── index.ts               # Barrel exports
│   │
│   ├── 🎨 constants/               # Constantes y configuraciones
│   │   └── Styles.ts              # Estilos centralizados
│   │
│   ├── 📊 data/                    # Datos mock y configuraciones
│   │   └── mockStores.ts          # Datos de tiendas de ejemplo
│   │
│   ├── 📱 screens/                 # Pantallas principales
│   │   └── HomeScreen.tsx         # Pantalla principal de tiendas
│   │
│   ├── 🔧 services/                # Servicios y APIs (futuro)
│   │   └── (vacío - para futuras integraciones)
│   │
│   ├── 📝 types/                   # Definiciones de tipos TypeScript
│   │   └── store.ts               # Tipos para tiendas y categorías
│   │
│   ├── 🛠️ utils/                   # Utilidades y helpers
│   │   └── performance.ts         # Utilidades de rendimiento
│   │
│   └── index.ts                   # Barrel export principal
│
├── 📋 Archivos de configuración
├── package.json
├── tsconfig.json
├── eslint.config.js
├── app.json
├── README.md
├── README_OPTIMIZATIONS.md
└── PROJECT_STRUCTURE.md
```

## 🎯 Beneficios de la Nueva Estructura

### 1. **Separación Clara de Responsabilidades**
- **`src/components/`**: Componentes organizados por funcionalidad
- **`src/screens/`**: Pantallas completas de la aplicación
- **`src/services/`**: Lógica de negocio y APIs
- **`src/utils/`**: Funciones de utilidad reutilizables

### 2. **Escalabilidad**
- Fácil agregar nuevas funcionalidades
- Estructura modular que crece con el proyecto
- Separación entre código legacy y nuevo código

### 3. **Mantenibilidad**
- Imports más limpios usando barrel exports
- Código organizado por dominio/funcionalidad
- Fácil localización de archivos

### 4. **Mejores Prácticas**
- Estructura estándar de la industria
- Compatible con herramientas de desarrollo
- Preparado para testing y CI/CD

## 📦 Barrel Exports

### `src/components/index.ts`
```typescript
// Common components
export { ThemedText } from './common/ThemedText';
export { ThemedView } from './common/ThemedView';
export { MemoizedThemedText } from './common/MemoizedThemedText';

// Store components
export { StoreCard } from './store/StoreCard';
export { CategoryFilter } from './store/CategoryFilter';
```

### `src/index.ts`
```typescript
// Exporta todo desde src/ para imports limpios
export * from './types/store';
export * from './components';
export * from './data/mockStores';
export * from './constants/Styles';
export * from './utils/performance';
export { default as HomeScreen } from './screens/HomeScreen';
```

## 🔄 Migración de Imports

### Antes:
```typescript
import { ThemedText } from '@/components/ThemedText';
import { Store } from '@/types/store';
import { mockStores } from '@/data/mockStores';
```

### Después:
```typescript
import { ThemedText } from '@/src/components/common/ThemedText';
import { Store } from '@/src/types/store';
import { mockStores } from '@/src/data/mockStores';

// O usando barrel exports:
import { ThemedText, Store, mockStores } from '@/src';
```

## 🚀 Próximos Pasos

1. **Servicios**: Agregar integración con APIs reales
2. **Testing**: Estructura preparada para tests unitarios
3. **Storybook**: Documentación de componentes
4. **Hooks**: Mover hooks personalizados a `src/hooks/`
5. **Contexts**: Agregar gestión de estado global

## 📝 Convenciones

- **PascalCase**: Componentes y tipos
- **camelCase**: Funciones y variables
- **kebab-case**: Nombres de archivos cuando sea apropiado
- **Barrel exports**: Usar `index.ts` para exportaciones limpias
- **Imports absolutos**: Usar `@/src/` para imports desde src

---

Esta estructura está diseñada para crecer con el proyecto y mantener el código organizado y mantenible a largo plazo.
