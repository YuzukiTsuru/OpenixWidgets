import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import {
  ThemeMode,
  ThemeColors,
  DerivedColors,
  getAllThemes,
  getThemeById,
  getDefaultDarkTheme,
  getDefaultLightTheme,
} from './types';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function rgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(0, 0, 0, ${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function computeDerivedColors(colors: ThemeColors): DerivedColors {
  return {
    accentDim: rgba(colors.accent, 0.733),
    accentMuted: rgba(colors.accent, 0.25),
    accentSubtle: rgba(colors.accent, 0.15),
    accentShadow: rgba(colors.accent, 0.3),
    accentBorder: rgba(colors.accent, 0.4),
    successDim: rgba(colors.success, 0.2),
    successMuted: rgba(colors.success, 0.25),
    successSubtle: rgba(colors.success, 0.15),
    successShadow: rgba(colors.success, 0.3),
    successBorder: rgba(colors.success, 0.404),
    warningDim: rgba(colors.warning, 0.2),
    warningMuted: rgba(colors.warning, 0.25),
    warningSubtle: rgba(colors.warning, 0.15),
    warningShadow: rgba(colors.warning, 0.3),
    warningBorder: rgba(colors.warning, 0.4),
    errorDim: rgba(colors.error, 0.2),
    errorMuted: rgba(colors.error, 0.25),
    errorSubtle: rgba(colors.error, 0.15),
    errorShadow: rgba(colors.error, 0.3),
    errorBorder: rgba(colors.error, 0.4),
    overlayMuted: rgba(colors.overlay0, 0.2),
    overlaySubtle: rgba(colors.overlay0, 0.1),
    textSubtle: rgba(colors.text, 0.1),
    modalOverlay: rgba(colors.base, 0.5),
    modalOverlayDark: rgba(colors.base, 0.7),
    editorOverlay: rgba(colors.base, 0.8),
    shadowLg: 'rgba(0, 0, 0, 0.5)',
    shadowMd: 'rgba(0, 0, 0, 0.4)',
    shadowSm: 'rgba(0, 0, 0, 0.3)',
    progressIndeterminate: rgba(colors.accent, 0.733),
  };
}

interface ThemeContextValue {
  themeMode: ThemeMode;
  effectiveVariant: 'light' | 'dark';
  currentThemeId: string;
  currentColors: ThemeColors;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeId: (id: string, variant: 'dark' | 'light') => void;
  availableThemes: ReturnType<typeof getAllThemes>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
}

interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: ThemeMode;
  initialThemeIdDark?: string;
  initialThemeIdLight?: string;
  onThemeChange?: (mode: ThemeMode, themeIdDark: string, themeIdLight: string) => void;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'dark',
  initialThemeIdDark = 'catppuccin-mocha',
  initialThemeIdLight = 'catppuccin-latte',
  onThemeChange,
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(initialMode);
  const [themeIdDark, setThemeIdDarkState] = useState<string>(initialThemeIdDark);
  const [themeIdLight, setThemeIdLightState] = useState<string>(initialThemeIdLight);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme);

  const availableThemes = useMemo(() => getAllThemes(), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const effectiveVariant = themeMode === 'system' ? systemTheme : themeMode;
  const currentThemeId = effectiveVariant === 'dark' ? themeIdDark : themeIdLight;

  const currentTheme = useMemo(() => {
    const theme = getThemeById(currentThemeId);
    if (theme && theme.variant === effectiveVariant) return theme;
    return effectiveVariant === 'dark' ? getDefaultDarkTheme() : getDefaultLightTheme();
  }, [currentThemeId, effectiveVariant]);

  const isDark = currentTheme.variant === 'dark';
  const currentColors = currentTheme.colors;

  const setThemeMode = useCallback(
    (mode: ThemeMode) => {
      setThemeModeState(mode);
      onThemeChange?.(mode, themeIdDark, themeIdLight);
    },
    [onThemeChange, themeIdDark, themeIdLight]
  );

  const setThemeId = useCallback(
    (id: string, variant: 'dark' | 'light') => {
      if (variant === 'dark') {
        setThemeIdDarkState(id);
        onThemeChange?.(themeMode, id, themeIdLight);
      } else {
        setThemeIdLightState(id);
        onThemeChange?.(themeMode, themeIdDark, id);
      }
    },
    [onThemeChange, themeMode, themeIdDark, themeIdLight]
  );

  useEffect(() => {
    const root = document.documentElement;
    const colors = currentColors;
    const derived = computeDerivedColors(colors);

    root.style.setProperty('--color-base', colors.base);
    root.style.setProperty('--color-mantle', colors.mantle);
    root.style.setProperty('--color-crust', colors.crust);
    root.style.setProperty('--color-surface0', colors.surface0);
    root.style.setProperty('--color-surface1', colors.surface1);
    root.style.setProperty('--color-surface2', colors.surface2);
    root.style.setProperty('--color-overlay0', colors.overlay0);
    root.style.setProperty('--color-overlay1', colors.overlay1);
    root.style.setProperty('--color-overlay2', colors.overlay2);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-subtext0', colors.subtext0);
    root.style.setProperty('--color-subtext1', colors.subtext1);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-accent-hover', colors.accentHover);
    root.style.setProperty('--color-accent-text', colors.accentText);
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-warning', colors.warning);
    root.style.setProperty('--color-error', colors.error);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-interactive', colors.interactive);
    root.style.setProperty('--color-interactive-hover', colors.interactiveHover);
    root.style.setProperty('--color-interactive-active', colors.interactiveActive);
    root.style.setProperty('--color-accent-dim', derived.accentDim);
    root.style.setProperty('--color-accent-muted', derived.accentMuted);
    root.style.setProperty('--color-accent-subtle', derived.accentSubtle);
    root.style.setProperty('--color-accent-shadow', derived.accentShadow);
    root.style.setProperty('--color-accent-border', derived.accentBorder);
    root.style.setProperty('--color-success-dim', derived.successDim);
    root.style.setProperty('--color-success-muted', derived.successMuted);
    root.style.setProperty('--color-success-subtle', derived.successSubtle);
    root.style.setProperty('--color-success-shadow', derived.successShadow);
    root.style.setProperty('--color-success-border', derived.successBorder);
    root.style.setProperty('--color-warning-dim', derived.warningDim);
    root.style.setProperty('--color-warning-muted', derived.warningMuted);
    root.style.setProperty('--color-warning-subtle', derived.warningSubtle);
    root.style.setProperty('--color-warning-shadow', derived.warningShadow);
    root.style.setProperty('--color-warning-border', derived.warningBorder);
    root.style.setProperty('--color-error-dim', derived.errorDim);
    root.style.setProperty('--color-error-muted', derived.errorMuted);
    root.style.setProperty('--color-error-subtle', derived.errorSubtle);
    root.style.setProperty('--color-error-shadow', derived.errorShadow);
    root.style.setProperty('--color-error-border', derived.errorBorder);
    root.style.setProperty('--color-overlay-muted', derived.overlayMuted);
    root.style.setProperty('--color-overlay-subtle', derived.overlaySubtle);
    root.style.setProperty('--color-text-subtle', derived.textSubtle);
    root.style.setProperty('--color-modal-overlay', derived.modalOverlay);
    root.style.setProperty('--color-modal-overlay-dark', derived.modalOverlayDark);
    root.style.setProperty('--color-editor-overlay', derived.editorOverlay);
    root.style.setProperty('--color-shadow-lg', derived.shadowLg);
    root.style.setProperty('--color-shadow-md', derived.shadowMd);
    root.style.setProperty('--color-shadow-sm', derived.shadowSm);
    root.style.setProperty('--color-progress-indeterminate', derived.progressIndeterminate);
    root.setAttribute('data-theme', currentTheme.variant);
  }, [currentColors, currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        effectiveVariant,
        currentThemeId,
        currentColors,
        isDark,
        setThemeMode,
        setThemeId,
        availableThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
