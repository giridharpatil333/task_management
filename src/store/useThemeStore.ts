import { create } from 'zustand';
import { THEME_KEY } from '../constants/config';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

const getInitialTheme = () => {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const nextTheme = !state.isDark;
      localStorage.setItem(THEME_KEY, nextTheme ? 'dark' : 'light');
      if (nextTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDark: nextTheme };
    }),
}));
