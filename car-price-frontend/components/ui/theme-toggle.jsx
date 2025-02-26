import React from 'react';
import { useTheme } from '../../lib/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  const handleToggle = (e) => {
    e.preventDefault();
    console.log("Theme toggle clicked, current theme:", theme);
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        p-2 rounded-md transition-all duration-200
        ${theme === 'dark' 
          ? 'bg-slate-800 text-yellow-300' 
          : 'bg-slate-200 text-slate-700'}
      `}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
} 