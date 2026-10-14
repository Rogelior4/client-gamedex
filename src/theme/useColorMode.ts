import { useState, useMemo } from 'react';
import { getAppTheme } from './theme';

export const useColorMode = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    // Clear all legacy keys that were inadvertently set to light
    try {
      localStorage.removeItem('gamedex_theme_mode');
      localStorage.removeItem('gamedex_theme_mode_v2');
    } catch {}

    const manualChoice = localStorage.getItem('gamedex_theme_manual');
    if (manualChoice === 'light' || manualChoice === 'dark') {
      return manualChoice;
    }
    return 'dark';
  });

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const nextMode = prevMode === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('gamedex_theme_manual', nextMode);
      } catch {}
      return nextMode;
    });
  };

  const isDark = mode === 'dark';
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return { mode, isDark, toggleColorMode, theme };
};
