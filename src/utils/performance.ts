import React from 'react';
import { InteractionManager } from 'react-native';

// Optimización: Utilidades para mejorar el rendimiento

/**
 * Ejecuta una función después de que todas las interacciones hayan terminado
 * Útil para operaciones pesadas que no deben bloquear la UI
 */
export const runAfterInteractions = (callback: () => void): void => {
  InteractionManager.runAfterInteractions(callback);
};

/**
 * Debounce function para limitar la frecuencia de ejecución
 * Útil para búsquedas, validaciones, etc.
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function para limitar la frecuencia de ejecución
 * Útil para eventos de scroll, resize, etc.
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

/**
 * Función para lazy loading de componentes
 * Ayuda a reducir el bundle inicial
 */
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  return React.lazy(importFunc);
};

/**
 * Hook personalizado para manejar estados de carga
 */
export const useAsyncOperation = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const execute = async <T>(operation: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute };
};
