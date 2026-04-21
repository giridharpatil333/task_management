import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-surface-900 
          text-surface-900 dark:text-surface-100
          transition-all duration-200 outline-none
          placeholder:text-surface-400 dark:placeholder:text-surface-600
          ${error 
            ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30' 
            : 'border-surface-200 dark:border-surface-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-surface-900 
          text-surface-900 dark:text-surface-100
          transition-all duration-200 outline-none
          border-surface-200 dark:border-surface-700 
          focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
          cursor-pointer appearance-none
          ${className}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
