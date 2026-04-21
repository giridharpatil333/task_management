import { create } from 'zustand';
import { Task, TaskFilter, TaskStats, TaskStatus } from '../types/task';
import { storage } from '../utils/storage';

interface TaskState {
  tasks: Task[];
  filters: TaskFilter;
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  resetTasks: () => void;
  
  // Filter Actions
  setFilters: (filters: Partial<TaskFilter>) => void;
  resetFilters: () => void;
  
  // Selectors
  getFilteredTasks: () => Task[];
  getStats: () => TaskStats;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: storage.loadTasks(),
  filters: {
    search: '',
    status: 'all',
    priority: 'all',
  },

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const newTasks = [newTask, ...get().tasks];
    set({ tasks: newTasks });
    storage.saveTasks(newTasks);
  },

  updateTask: (id, updates) => {
    const newTasks = get().tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    set({ tasks: newTasks });
    storage.saveTasks(newTasks);
  },

  deleteTask: (id) => {
    const newTasks = get().tasks.filter((t) => t.id !== id);
    set({ tasks: newTasks });
    storage.saveTasks(newTasks);
  },

  toggleTaskStatus: (id) => {
    const newTasks = get().tasks.map((t) =>
      t.id === id ? { ...t, status: (t.status === 'completed' ? 'pending' : 'completed') as TaskStatus } : t
    );
    set({ tasks: newTasks });
    storage.saveTasks(newTasks);
  },

  reorderTasks: (reorderedSubset) => {
    const allTasks = [...get().tasks];
    
    // Create a map for quick lookup of positions in the reordered subset
    const subsetIds = new Set(reorderedSubset.map(t => t.id));
    
    // Find the original indices of these tasks in the full list
    const originalIndices = allTasks
      .map((t, i) => (subsetIds.has(t.id) ? i : -1))
      .filter(i => i !== -1);
      
    // Replace items at those specific indices with items from the reordered subset
    reorderedSubset.forEach((task, index) => {
      const targetIndex = originalIndices[index];
      allTasks[targetIndex] = task;
    });

    set({ tasks: allTasks });
    storage.saveTasks(allTasks);
  },

  resetTasks: () => {
    set({ tasks: [] });
    storage.saveTasks([]);
  },

  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },

  resetFilters: () => {
    set({
      filters: {
        search: '',
        status: 'all',
        priority: 'all',
      },
    });
  },

  getFilteredTasks: () => {
    const { tasks, filters } = get();
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'all' || task.status === filters.status;
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  },

  getStats: () => {
    const { tasks } = get();
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      pending: tasks.filter((t) => t.status === 'pending').length,
    };
  },
}));
