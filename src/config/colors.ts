// 🎨 Configuração centralizada de cores
// Paleta de cores suaves e profissionais para psicologia

export const COLORS = {
  // Cores principais - Paleta oriental zen
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Cores neutras
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Cores de destaque
  accent: {
    gold: '#f59e0b',
    warm: '#f97316',
    cool: '#06b6d4',
  },
  
  // Cores de estado
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Gradientes
  gradients: {
    primary: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    hero: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.9) 100%)',
    card: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  }
} as const;

// Tipos para TypeScript
export type ColorKey = keyof typeof COLORS;
export type ColorValue = typeof COLORS[ColorKey];
