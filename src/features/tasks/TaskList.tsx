import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '../../types/task';
import { TaskCard } from './TaskCard';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { TaskFormModal } from './TaskFormModal';
import { useTaskStore } from '../../store/useTaskStore';

interface TaskListProps {
  tasks: Task[];
  viewMode: 'list' | 'grid';
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, viewMode }) => {
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const deleteTask = useTaskStore((state) => state.deleteTask);
  const toggleStatus = useTaskStore((state) => state.toggleTaskStatus);
  const reorderTasks = useTaskStore((state) => state.reorderTasks);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      reorderTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-24 h-24 mb-6 text-surface-200 dark:text-surface-800">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-2">No tasks found</h3>
        <p className="text-surface-500 dark:text-surface-400 max-w-sm">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={viewMode === 'list' ? verticalListSortingStrategy : rectSortingStrategy}
        >
          <div className={viewMode === 'list' ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                viewMode={viewMode}
                onEdit={setTaskToEdit}
                onDelete={setTaskToDelete}
                onToggle={toggleStatus}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <TaskFormModal
        isOpen={!!taskToEdit}
        onClose={() => setTaskToEdit(null)}
        taskToEdit={taskToEdit}
      />

      <ConfirmDialog
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={() => taskToDelete && deleteTask(taskToDelete)}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </>
  );
};
