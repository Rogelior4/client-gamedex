import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Fade,
} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import { useTheme } from '@mui/material/styles';
import { Game } from '../../types/game.types';
import { getPlatformStyle } from '../../utils/platformStyles';
import { getStatusStyle } from '../../utils/statusStyles';

interface DeleteGameDialogProps {
  open: boolean;
  game: Game | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export const DeleteGameDialog: React.FC<DeleteGameDialogProps> = ({
  open,
  game,
  onClose,
  onConfirm,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!game) return null;

  const platformStyle = getPlatformStyle(game.platform, isDark);
  const statusStyle = getStatusStyle(game.status, isDark);

  const handleConfirm = () => {
    onConfirm(game.id);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Fade}
      transitionDuration={250}
      PaperProps={{
        sx: {
          borderRadius: '24px',
          bgcolor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(239, 68, 68, 0.25)' : 'rgba(239, 68, 68, 0.2)',
          boxShadow: isDark
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(239, 68, 68, 0.15)'
            : '0 25px 50px -12px rgba(239, 68, 68, 0.15)',
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1, pt: 2 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 6px 18px rgba(239, 68, 68, 0.45)',
          }}
        >
          <DeleteForeverRoundedIcon sx={{ fontSize: 26 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="800" sx={{ lineHeight: 1.2 }}>
            ¿Eliminar Videojuego?
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Esta acción no se puede deshacer
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: '16px !important', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          ¿Estás seguro de que deseas eliminar permanentemente este título de tu biblioteca de GameDex?
        </Typography>

        {/* Selected Game Details Pill */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 1.5,
            borderRadius: '16px',
            bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          }}
        >
          {game.coverUrl ? (
            <Box
              component="img"
              src={game.coverUrl}
              alt={game.title}
              sx={{
                width: 48,
                height: 72,
                borderRadius: '10px',
                objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
            />
          ) : (
            <Box
              sx={{
                width: 48,
                height: 72,
                borderRadius: '10px',
                bgcolor: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
              }}
            >
              <SportsEsportsRoundedIcon sx={{ fontSize: 24 }} />
            </Box>
          )}

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight="800" noWrap sx={{ mb: 0.5, fontSize: '1rem' }}>
              {game.title}
            </Typography>

            <Box display="flex" alignItems="center" gap={0.8} flexWrap="wrap">
              <Chip
                label={platformStyle.label}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  color: platformStyle.color,
                  bgcolor: platformStyle.bgColor,
                  border: '1px solid',
                  borderColor: platformStyle.borderColor,
                }}
              />

              <Chip
                label={statusStyle.label}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  color: statusStyle.color,
                  bgcolor: isDark ? 'rgba(11, 15, 25, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid',
                  borderColor: statusStyle.borderColor,
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: '12px',
            px: 2.5,
            color: 'text.secondary',
            fontWeight: '600',
            textTransform: 'none',
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          startIcon={<DeleteForeverRoundedIcon />}
          sx={{
            borderRadius: '12px',
            px: 3,
            py: 1,
            fontWeight: '700',
            textTransform: 'none',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              boxShadow: '0 6px 20px rgba(239, 68, 68, 0.6)',
            },
          }}
        >
          Eliminar Juego
        </Button>
      </DialogActions>
    </Dialog>
  );
};
