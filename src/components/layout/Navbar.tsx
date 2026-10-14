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
  isDark: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  isSyncing,
  onSyncCovers,
  onOpenAddGame,
  onOpenBackup,
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
          borderRadius: { xs: '18px', md: '24px' },
          bgcolor: isDark ? 'rgba(11, 15, 25, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          boxShadow: isDark
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 20px 40px -15px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar sx={{ height: { xs: 70, md: 76 }, px: '0 !important', gap: 2 }}>
            {/* Logo & Brand */}
            <Box
              display="flex"
              alignItems="center"
              gap={1.5}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.9 },
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#0f172a',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDark ? '#f4f4f5' : '#ffffff',
                }}
              >
                <SportsEsportsRoundedIcon sx={{ fontSize: 22 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  fontFamily: '"Outfit", sans-serif',
                  color: isDark ? '#f4f4f5' : '#0f172a',
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
                  bgcolor: isDark ? '#ffffff' : '#0f172a',
                  color: isDark ? '#090a0f' : '#ffffff',
                  boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(15,23,42,0.15)',
                  borderRadius: '10px',
                  px: 2.2,
                  py: 0.85,
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  letterSpacing: '-0.01em',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    bgcolor: isDark ? '#e4e4e7' : '#1e293b',
                    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(15,23,42,0.25)',
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
