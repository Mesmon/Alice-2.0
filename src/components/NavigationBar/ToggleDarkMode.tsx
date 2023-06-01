import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ToggleDarkMode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => {
        if (theme === 'light') {
          return setTheme('dark');
        }
        return setTheme('light');
      }}
      type="button"
      className="opacity-75 text-xl text-black dark:text-white"
    >
        Toggle to {theme === 'light' ? 'dark' : 'light'} theme
    </button>
  );
};

export default ToggleDarkMode;
