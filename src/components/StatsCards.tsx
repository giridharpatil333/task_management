import React from 'react';
import { useTaskStore } from '../store/useTaskStore';

export const StatsCards: React.FC = () => {
  const stats = useTaskStore((state) => state.getStats());

  const cards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: 'text-green-500 bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div 
          key={card.label}
          className="bg-white dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-surface-500 dark:text-surface-400">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                {card.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
