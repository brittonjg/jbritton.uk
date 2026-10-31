/*
 * Light-theme colour tokens for places that can't read CSS variables, such
 * as the share image rendered at build time. Keep in step with the @theme
 * block in src/styles/globals.css.
 */
export const lightColours = {
  background: "#fafafa",
  textPrimary: "#37474f",
  textSecondary: "#55646d",
  accent: "#b45309",
  accentDecor: "#d97706",
} as const;
