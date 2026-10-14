import { useState, useEffect, useMemo } from 'react';
import { getAppTheme } from './theme';

export const useColorMode = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('gamedex_theme_mode_v2');
    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }
    // Clean old light preference and default strictly to comfortable dark mode
    try {
      localStorage.removeItem('gamedex_theme_mode');
    } catch {}
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('gamedex_theme_mode_v2', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const isDark = mode === 'dark';
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return { mode, isDark, toggleColorMode, theme };
};
