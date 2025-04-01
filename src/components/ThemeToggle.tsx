'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed z-50 right-4 top-4 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        // Moon icon for dark mode
        <i className="fa-solid fa-moon"></i>
      ) : (
        // Sun icon for light mode
        <i className="fa-solid fa-sun"></i>
      )}
    </button>
  );
}
