export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  base: string;
  mantle: string;
  crust: string;
  surface0: string;
  surface1: string;
  surface2: string;
  overlay0: string;
  overlay1: string;
  overlay2: string;
  text: string;
  subtext0: string;
  subtext1: string;
  accent: string;
  accentHover: string;
  accentText: string;
  success: string;
  warning: string;
  error: string;
  border: string;
  interactive: string;
  interactiveHover: string;
  interactiveActive: string;
}

export interface DerivedColors {
  accentDim: string;
  accentMuted: string;
  accentSubtle: string;
  accentShadow: string;
  accentBorder: string;
  successDim: string;
  successMuted: string;
  successSubtle: string;
  successShadow: string;
  successBorder: string;
  warningDim: string;
  warningMuted: string;
  warningSubtle: string;
  warningShadow: string;
  warningBorder: string;
  errorDim: string;
  errorMuted: string;
  errorSubtle: string;
  errorShadow: string;
  errorBorder: string;
  overlayMuted: string;
  overlaySubtle: string;
  textSubtle: string;
  modalOverlay: string;
  modalOverlayDark: string;
  editorOverlay: string;
  shadowLg: string;
  shadowMd: string;
  shadowSm: string;
  progressIndeterminate: string;
}

export interface Theme {
  id: string;
  name: string;
  variant: 'dark' | 'light';
  variantName: string;
  colors: ThemeColors;
  derived: DerivedColors;
}

export { getAllThemes, getThemeById, getDefaultDarkTheme, getDefaultLightTheme } from './configs';
export type { ThemeDefinition } from './configs';
