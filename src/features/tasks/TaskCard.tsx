import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types/task';
import { PRIORITY_COLORS } from '../../constants/config';
import { formatDate } from '../../utils/helpers';
import { Button } from '../../components/Button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  viewMode: 'list' | 'grid';
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggle,
  viewMode,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    // Removed global opacity to prevent it from turning 'white' or washing out
  };

  const isCompleted = task.status === 'completed';

  const cardClasses = `
    group relative bg-white dark:bg-surface-900 
    border border-surface-200 dark:border-surface-800 
    rounded-xl shadow-sm hover:shadow-md transition-all duration-200
    ${isDragging ? 'ring-2 ring-primary-500 z-50 scale-[1.02] rotate-1 shadow-xl' : ''}
    ${viewMode === 'list' 
      ? 'flex flex-col sm:flex-row sm:items-center p-4 gap-3 sm:gap-4' 
      : 'flex flex-col p-5 h-full'}
    ${isCompleted ? 'bg-surface-50 dark:bg-surface-950/40' : ''}
  `;

  return (
    <div ref={setNodeRef} style={style} className={cardClasses}>
      {/* Top Bar / Drag & Checkbox */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Drag Handle */}
        <div 
          {...attributes} 
          {...listeners}
          className={`
            cursor-grab active:cursor-grabbing p-1.5 rounded-md transition-all touch-none
            ${isDragging 
              ? 'bg-primary-600 text-white shadow-lg' 
              : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/40'}
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16" />
          </svg>
        </div>

        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`
            flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center
            ${isCompleted 
              ? 'bg-primary-500 border-primary-500 text-white' 
              : 'border-surface-300 dark:border-surface-700 hover:border-primary-500'}
          `}
        >
          {isCompleted && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${viewMode === 'grid' ? 'mt-4 mb-6' : 'mt-1 sm:mt-0'}`}>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className={`font-semibold text-surface-900 dark:text-surface-100 truncate max-w-[200px] sm:max-w-none ${isCompleted ? 'line-through text-surface-500' : ''}`}>
            {task.title}
          </h3>
          <div className="flex gap-1.5 ml-auto sm:ml-0">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              isCompleted 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {task.status}
            </span>
          </div>
        </div>
        <p className={`text-sm text-surface-500 dark:text-surface-400 line-clamp-2 ${isCompleted ? 'opacity-50' : ''}`}>
          {task.description || 'No description provided.'}
        </p>
      </div>

      {/* Footer / Meta */}
      <div className={`
        flex items-center justify-between gap-4 
        ${viewMode === 'grid' 
          ? 'mt-auto pt-4 border-t border-surface-100 dark:border-surface-800' 
          : 'sm:border-none pt-2 sm:pt-0'}
      `}>
        <div className="flex items-center text-xs text-surface-400 font-medium">
          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(task.dueDate)}
        </div>

        <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 !p-0"
            onClick={() => onEdit(task)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 !p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => onDelete(task.id)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};
