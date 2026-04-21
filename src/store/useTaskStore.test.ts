import { renderHook, act } from '@testing-library/react';
import { useTaskStore } from '../store/useTaskStore';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock crypto.randomUUID
Object.defineProperty(window, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-' + Math.random(),
  },
});

describe('useTaskStore', () => {
  beforeEach(() => {
    localStorage.clear();
    const { result } = renderHook(() => useTaskStore());
    act(() => {
      result.current.resetTasks();
    });
  });

  it('should add a task', () => {
    const { result } = renderHook(() => useTaskStore());
    
    act(() => {
      result.current.addTask({
        title: 'New Task',
        description: 'Test Description',
        priority: 'high',
        dueDate: '2024-12-31',
        status: 'pending',
      });
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe('New Task');
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useTaskStore());
    
    act(() => {
      result.current.addTask({
        title: 'To Delete',
        description: '',
        priority: 'low',
        dueDate: '2024-12-31',
        status: 'pending',
      });
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks.length).toBe(0);
  });

  it('should toggle task status', () => {
    const { result } = renderHook(() => useTaskStore());
    
    act(() => {
      result.current.addTask({
        title: 'Status Toggle',
        description: '',
        priority: 'medium',
        dueDate: '2024-12-31',
        status: 'pending',
      });
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.toggleTaskStatus(taskId);
    });

    expect(result.current.tasks[0].status).toBe('completed');

    act(() => {
      result.current.toggleTaskStatus(taskId);
    });

    expect(result.current.tasks[0].status).toBe('pending');
  });
});
