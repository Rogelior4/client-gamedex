import { useState, useEffect, useMemo } from 'react';
import { getAppTheme } from './theme';

export const useColorMode = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('gamedex_theme_mode');
    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('gamedex_theme_mode', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const isDark = mode === 'dark';
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return { mode, isDark, toggleColorMode, theme };
};
