// types/theme.ts
export type Theme = "light" | "dark" | string;

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: (themes: string) => void;
}
