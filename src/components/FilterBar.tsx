import React, { useMemo } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Input, Select } from './Input';
import { debounce } from '../utils/helpers';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters } = useTaskStore();

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setFilters({ search: value }), 300),
    [setFilters]
  );

  return (
    <div className="space-y-4 bg-white dark:bg-surface-900 p-4 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          placeholder="Search tasks..."
          defaultValue={filters.search}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        
        <Select
          options={[
            { label: 'All Status', value: 'all' },
            { label: 'Pending', value: 'pending' },
            { label: 'Completed', value: 'completed' },
          ]}
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value as any })}
        />

        <Select
          options={[
            { label: 'All Priorities', value: 'all' },
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]}
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value as any })}
        />
      </div>
      
      {(filters.search || filters.status !== 'all' || filters.priority !== 'all') && (
        <button
          onClick={resetFilters}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};
