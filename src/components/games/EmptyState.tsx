import React from 'react';
import { Paper, Box, Typography, Button } from '@mui/material';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
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
        p: { xs: 6, md: 10 },
        textAlign: 'center',
        borderRadius: '28px',
        bgcolor: isDark ? 'rgba(17, 24, 39, 0.5)' : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '2px dashed',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '24px',
          bgcolor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 3,
          color: 'primary.main',
        }}
      >
        <SportsEsportsRoundedIcon sx={{ fontSize: 44 }} />
      </Box>

      <Typography variant="h5" fontWeight="800" sx={{ mb: 1 }}>
        {searchTerm
          ? `Sin resultados para "${searchTerm}"`
          : activeStatusFilter !== 'ALL'
          ? `No tienes juegos en ${
              activeStatusFilter === 'FAVORITES'
                ? 'Favoritos'
                : STATUS_FILTERS.find((s) => s.id === activeStatusFilter)?.label || activeStatusFilter
            }`
          : activePlatformFilter !== 'ALL'
          ? `No tienes juegos registrados en ${activePlatformFilter}`
          : 'Tu colección está vacía 🎮'}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 460, mx: 'auto', mb: 4 }}>
        {searchTerm
          ? 'Intenta buscar con otro término o revisa la ortografía.'
          : 'Agrega tu primer título para comenzar a organizar tu biblioteca y cargar carátulas en alta resolución.'}
      </Typography>

      {searchTerm ? (
        <Button
          variant="outlined"
          onClick={onClearSearch}
          sx={{ borderRadius: '12px', px: 3, py: 1 }}
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
            px: 3.5,
            py: 1.2,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)',
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
          }}
        >
          Añadir Mi Primer Juego
        </Button>
      )}
    </Paper>
  );
};
