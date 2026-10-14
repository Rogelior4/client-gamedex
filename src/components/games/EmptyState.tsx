import React from 'react';
import { Paper, Box, Typography, Button } from '@mui/material';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { STATUS_FILTERS } from '../../constants/game.constants';

interface EmptyStateProps {
  searchTerm: string;
  activeStatusFilter: string;
  activePlatformFilter: string;
  onClearSearch: () => void;
  onOpenAddGame: () => void;
  isDark: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  activeStatusFilter,
  activePlatformFilter,
  onClearSearch,
  onOpenAddGame,
  isDark,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        py: { xs: 8, md: 12 },
        px: 3,
        textAlign: 'center',
        borderRadius: { xs: '22px', md: '30px' },
        bgcolor: isDark ? 'rgba(14, 18, 29, 0.5)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '2px dashed',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(0, 0, 0, 0.09)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: 84,
          height: 84,
          borderRadius: '24px',
          bgcolor: isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.08)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 3,
          color: 'primary.main',
          boxShadow: '0 12px 30px rgba(99, 102, 241, 0.25)',
        }}
      >
        {searchTerm ? (
          <SearchOffRoundedIcon sx={{ fontSize: 44 }} />
        ) : (
          <SportsEsportsRoundedIcon sx={{ fontSize: 44 }} />
        )}
      </Box>

      <Typography
        variant="h4"
        fontWeight="900"
        sx={{
          mb: 1.2,
          fontFamily: '"Outfit", sans-serif',
          letterSpacing: '-0.02em',
          color: isDark ? '#f8fafc' : '#0f172a',
        }}
      >
        {searchTerm
          ? `Sin resultados para "${searchTerm}"`
          : activeStatusFilter !== 'ALL'
          ? `No hay juegos en ${
              activeStatusFilter === 'FAVORITES'
                ? 'Favoritos'
                : STATUS_FILTERS.find((s) => s.id === activeStatusFilter)?.label || activeStatusFilter
            }`
          : activePlatformFilter !== 'ALL'
          ? `No hay títulos en la plataforma ${activePlatformFilter}`
          : 'Tu bóveda gamer está vacía'}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto', mb: 3.5, fontSize: '0.96rem' }}>
        {searchTerm
          ? 'Verifica los términos de búsqueda o prueba explorando por plataforma o estado.'
          : 'Comienza agregando tu primer título para disfrutar de carátulas dinámicas multitienda (Steam, Epic, Nintendo, Riot, Xbox, etc.) y seguimiento de progreso.'}
      </Typography>

      {searchTerm ? (
        <Button
          variant="outlined"
          onClick={onClearSearch}
          sx={{
            borderRadius: '14px',
            px: 3.5,
            py: 1.2,
            fontWeight: 700,
            borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
            color: 'text.primary',
            '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
          }}
        >
          Limpiar Búsqueda
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={onOpenAddGame}
          startIcon={<AddRoundedIcon />}
          sx={{
            borderRadius: '14px',
            px: 4,
            py: 1.4,
            fontWeight: 800,
            fontSize: '0.92rem',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.45)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Añadir Mi Primer Juego
        </Button>
      )}
    </Paper>
  );
};
