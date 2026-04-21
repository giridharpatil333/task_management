import React, { useEffect } from 'react';
import { Dashboard } from './pages/Dashboard';
import { useThemeStore } from './store/useThemeStore';

const App: React.FC = () => {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="antialiased">
      <Dashboard />
    </div>
  );
};

export default App;
