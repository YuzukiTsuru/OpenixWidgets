import type { ThemeColors, DerivedColors } from '../types';

interface ThemeVariantConfig {
  type: 'Dark' | 'Light';
  config: ThemeColors;
}

interface ThemeConfigFile {
  id: string;
  name: string;
  variants: Record<string, ThemeVariantConfig>;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  variant: 'dark' | 'light';
  variantName: string;
  colors: ThemeColors;
  derived: DerivedColors;
}

import catppuccinConfig from './catppuccin.json';
import draculaConfig from './dracula.json';
import githubConfig from './github.json';
import atomOneConfig from './atom-one.json';
import arduinoConfig from './arduino.json';
import yuzukiConfig from './yuzuki.json';
import openixConfig from './openix.json';

const themeConfigs: ThemeConfigFile[] = [
  catppuccinConfig as ThemeConfigFile,
  draculaConfig as ThemeConfigFile,
  githubConfig as ThemeConfigFile,
  atomOneConfig as ThemeConfigFile,
  arduinoConfig as ThemeConfigFile,
  yuzukiConfig as ThemeConfigFile,
  openixConfig as ThemeConfigFile,
];

function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
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

export function getAllThemes(): ThemeDefinition[] {
  const themes: ThemeDefinition[] = [];
  for (const config of themeConfigs) {
    for (const [variantName, variantConfig] of Object.entries(config.variants)) {
      themes.push({
        id: `${config.id}-${toKebabCase(variantName)}`,
        name: config.name,
        variant: variantConfig.type.toLowerCase() as 'dark' | 'light',
        variantName,
        colors: variantConfig.config,
        derived: computeDerivedColors(variantConfig.config),
      });
    }
  }
  return themes;
}

export function getThemeById(themeId: string): ThemeDefinition | undefined {
  return getAllThemes().find((t) => t.id === themeId);
}

export function getDefaultDarkTheme(): ThemeDefinition {
  return getAllThemes().find((t) => t.variant === 'dark')!;
}

export function getDefaultLightTheme(): ThemeDefinition {
  return getAllThemes().find((t) => t.variant === 'light')!;
}
