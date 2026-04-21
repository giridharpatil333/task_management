export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
}

export type TaskFilter = {
  search: string;
  status: TaskStatus | 'all';
  priority: Priority | 'all';
};

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}
