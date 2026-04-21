import { Priority } from '../types/task';

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export const STORAGE_KEY = 'taskflow_tasks';
export const THEME_KEY = 'taskflow_theme';
