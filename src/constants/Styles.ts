import { StyleSheet } from 'react-native';

// Optimización: Centralizar estilos comunes para evitar duplicación
export const CommonStyles = StyleSheet.create({
  // Contenedores
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Espaciado
  paddingSmall: {
    padding: 8,
  },
  paddingMedium: {
    padding: 16,
  },
  paddingLarge: {
    padding: 24,
  },
  paddingXLarge: {
    padding: 32,
  },
  
  // Tipografía
  textSmall: {
    fontSize: 12,
    lineHeight: 18,
  },
  textRegular: {
    fontSize: 16,
    lineHeight: 24,
  },
  textLarge: {
    fontSize: 20,
    lineHeight: 28,
  },
  textXLarge: {
    fontSize: 24,
    lineHeight: 32,
  },
  textTitle: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  
  // Sombras
  shadowSmall: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  shadowMedium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Bordes
  borderRadiusSmall: {
    borderRadius: 4,
  },
  borderRadiusMedium: {
    borderRadius: 8,
  },
  borderRadiusLarge: {
    borderRadius: 12,
  },
  borderRadiusXLarge: {
    borderRadius: 16,
  },
});

// Optimización: Constantes para valores reutilizables
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
