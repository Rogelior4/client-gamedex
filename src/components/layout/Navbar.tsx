import React, { useEffect, useRef } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloudSyncRoundedIcon from '@mui/icons-material/CloudSyncRounded';
import { ThemeToggle } from '../common/ThemeToggle';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  isSyncing: boolean;
  onSyncCovers: () => void;
  onOpenAddGame: () => void;
  onOpenBackup: () => void;
  onOpenSteamSync?: () => void;
  isDark: boolean;
}

const SteamIcon: React.FC<{ sx?: any }> = ({ sx }) => (
  <Box
    component="svg"
    viewBox="0 0 24 24"
    sx={{ width: 18, height: 18, fill: 'currentColor', ...sx }}
  >
    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.524-4.524 4.524h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 14.87C1.815 20.084 6.559 24 12.02 24c6.627 0 12-5.373 12-12S18.605 0 11.979 0zM7.54 18.217l-1.473-.61c.262.543.743.963 1.344 1.146.91.276 1.87-.247 2.146-1.157.14-.459.088-.934-.112-1.332-.201-.399-.548-.701-.977-.832l1.503.621c-.42.986-1.445 1.554-2.431 1.164zm8.4-7.464c-1.391 0-2.523-1.133-2.523-2.524 0-1.392 1.132-2.524 2.523-2.524 1.392 0 2.524 1.132 2.524 2.524 0 1.391-1.132 2.524-2.524 2.524z" />
  </Box>
);

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  isSyncing,
  onSyncCovers,
  onOpenAddGame,
  onOpenBackup,
  onOpenSteamSync,
  isDark,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: Press '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 1.5, md: 2 } }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          maxWidth: '1440px',
          mx: 'auto',
          borderRadius: { xs: '14px', md: '18px' },
          bgcolor: isDark ? 'rgba(23, 27, 37, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
          boxShadow: isDark
            ? '0 8px 24px -10px rgba(0, 0, 0, 0.35)'
            : '0 8px 24px -10px rgba(0, 0, 0, 0.05)',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar sx={{ height: { xs: 68, md: 72 }, px: '0 !important', gap: 2 }}>
            {/* Logo & Brand */}
            <Box
              display="flex"
              alignItems="center"
              gap={1.4}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.9 },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#0f172a',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDark ? '#c8d3df' : '#ffffff',
                }}
              >
                <SportsEsportsRoundedIcon sx={{ fontSize: 20 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  fontFamily: '"Outfit", sans-serif',
                  color: isDark ? '#c8d3df' : '#0f172a',
                  fontSize: '1.18rem',
                }}
              >
                GameDex
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Command Search Bar */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
                borderRadius: '12px',
                px: 1.8,
                py: 0.5,
                width: { md: 340, lg: 400 },
                transition: 'all 0.2s ease',
                '&:focus-within': {
                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 1)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                  boxShadow: isDark
                    ? '0 4px 16px rgba(0,0,0,0.4)'
                    : '0 4px 16px rgba(0,0,0,0.06)',
                  width: { md: 380, lg: 440 },
                },
              }}
            >
              <TextField
                inputRef={searchInputRef}
                fullWidth
                variant="standard"
                placeholder="Buscar por título, plataforma..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon sx={{ color: 'text.secondary', fontSize: 19 }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={onClearSearch}>
                        <CloseRoundedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <Box
                        sx={{
                          px: 0.7,
                          py: 0.15,
                          borderRadius: '5px',
                          bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                          border: '1px solid',
                          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                          color: 'text.secondary',
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        /
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Header Right Actions */}
            <Box display="flex" alignItems="center" gap={1}>
              {/* Sync Covers from Multi-Store */}
              <Tooltip title="Sincronizar carátulas multitienda" arrow>
                <span>
                  <IconButton
                    onClick={onSyncCovers}
                    disabled={isSyncing}
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: '10px',
                      bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
                      color: isDark ? '#a1a1aa' : '#64748b',
                      transition: 'all 0.18s ease',
                      '&:hover': {
                        color: isDark ? '#ffffff' : '#0f172a',
                        bgcolor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <SyncRoundedIcon
                      sx={{
                        fontSize: 19,
                        animation: isSyncing ? 'spin 1s linear infinite' : 'none',
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' },
                        },
                      }}
                    />
                  </IconButton>
                </span>
              </Tooltip>

              {/* Steam Account Sync */}
              {onOpenSteamSync && (
                <Tooltip title="Sincronizar cuenta de Steam" arrow>
                  <IconButton
                    onClick={onOpenSteamSync}
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: '10px',
                      bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
                      color: isDark ? '#a1a1aa' : '#64748b',
                      transition: 'all 0.18s ease',
                      '&:hover': {
                        color: isDark ? '#ffffff' : '#0f172a',
                        bgcolor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <SteamIcon />
                  </IconButton>
                </Tooltip>
              )}

              {/* Backup & Restore */}
              <Tooltip title="Copia de seguridad y exportar/importar" arrow>
                <IconButton
                  onClick={onOpenBackup}
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
                    color: isDark ? '#a1a1aa' : '#64748b',
                    transition: 'all 0.18s ease',
                    '&:hover': {
                      color: isDark ? '#ffffff' : '#0f172a',
                      bgcolor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  <CloudSyncRoundedIcon sx={{ fontSize: 19 }} />
                </IconButton>
              </Tooltip>

              {/* Add Game Button */}
              <Button
                variant="contained"
                onClick={onOpenAddGame}
                startIcon={<AddRoundedIcon sx={{ fontSize: 19 }} />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  bgcolor: isDark ? '#232734' : '#0f172a',
                  color: '#f8fafc',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  boxShadow: 'none',
                  borderRadius: '10px',
                  px: 2.2,
                  py: 0.85,
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  letterSpacing: '-0.01em',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    bgcolor: isDark ? '#2f3445' : '#1e293b',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Añadir Juego
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />
            </Box>
          </Toolbar>

          {/* Mobile Search Bar */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, pb: 2, pt: 0.5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar videojuegos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={onClearSearch}>
                      <CloseRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
                },
              }}
            />
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};
