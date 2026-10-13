import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Typography,
  Chip,
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
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: isDark ? 'rgba(11, 15, 25, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        color: 'text.primary',
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ height: 80, px: { xs: 0 } }}>
          {/* Logo & Brand */}
          <Box display="flex" alignItems="center" gap={1.5} sx={{ cursor: 'pointer' }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
                transition: 'transform 0.25s ease',
                '&:hover': { transform: 'scale(1.05) rotate(-3deg)' },
              }}
            >
              <SportsEsportsRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: '-0.5px',
                    background: isDark
                      ? 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)'
                      : 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  GameDex
                </Typography>
                <Chip
                  label="VAULT"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    letterSpacing: 1,
                    bgcolor: 'rgba(99, 102, 241, 0.15)',
                    color: 'primary.main',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '6px',
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Integrated Search Bar (Desktop) */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              borderRadius: '14px',
              px: 2,
              py: 0.5,
              width: { sm: 260, md: 360 },
              transition: 'all 0.25s ease',
              '&:focus-within': {
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 1)',
                borderColor: 'primary.main',
                boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.15)',
                width: { sm: 300, md: 400 },
              },
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Buscar juegos o plataformas..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
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
            />
          </Box>

          {/* Header Actions */}
          <Box display="flex" alignItems="center" gap={1.5} ml={2}>
            <Tooltip title="Sincronizar carátulas faltantes desde Steam" arrow>
              <span>
                <IconButton
                  onClick={onSyncCovers}
                  disabled={isSyncing}
                  sx={{
                    borderRadius: '12px',
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    color: isDark ? '#38bdf8' : '#0284c7',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.1)',
                    },
                  }}
                >
                  <SyncRoundedIcon
                    sx={{
                      fontSize: 20,
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

            <Tooltip title="Copia de seguridad y exportar/importar colección" arrow>
              <IconButton
                onClick={onOpenBackup}
                sx={{
                  borderRadius: '12px',
                  bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  color: isDark ? '#818cf8' : '#4f46e5',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(79, 70, 229, 0.1)',
                  },
                }}
              >
                <CloudSyncRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              onClick={onOpenAddGame}
              startIcon={<AddRoundedIcon />}
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                background: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)',
                borderRadius: '12px',
                px: 2.5,
                py: 1,
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.25s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)',
                  boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Nuevo Juego
            </Button>

            <ThemeToggle />
          </Box>
        </Toolbar>

        {/* Mobile Search Input */}
        <Box sx={{ display: { xs: 'block', sm: 'none' }, pb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar juegos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              },
            }}
          />
        </Box>
      </Container>
    </AppBar>
  );
};
