import { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Chip,
  Box,
  IconButton,
  Skeleton,
  Tooltip,
  Rating,
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import { useTheme } from '@mui/material/styles';
import { getGameCover } from '../../services/game.service';
import { GameStatus } from '../../types/game.types';
import { getPlatformStyle } from '../../utils/platformStyles';
import { getStatusStyle } from '../../utils/statusStyles';

interface GameCardProps {
  id?: number;
  title: string;
  platform: string;
  coverUrl?: string | null;
  status?: GameStatus;
  rating?: number | null;
  isFavorite?: boolean;
  hoursPlayed?: number | null;
  notes?: string | null;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite?: () => void;
  onClick?: () => void;
}

const springEasing = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function GameCard({
  title,
  platform,
  coverUrl: initialCoverUrl,
  status = 'BACKLOG',
  rating,
  isFavorite = false,
  hoursPlayed,
  notes,
  onEdit,
  onDelete,
  onToggleFavorite,
  onClick,
}: GameCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [coverUrl, setCoverUrl] = useState<string | null>(initialCoverUrl ?? null);
  const [loadingImage, setLoadingImage] = useState(!initialCoverUrl);
  const [isHovered, setIsHovered] = useState(false);

  const platformStyle = getPlatformStyle(platform, isDark);
  const statusStyle = getStatusStyle(status, isDark);

  useEffect(() => {
    if (initialCoverUrl) {
      setCoverUrl(initialCoverUrl);
      setLoadingImage(false);
      return;
    }

    let isMounted = true;
    async function fetchCover() {
      try {
        setLoadingImage(true);
        const url = await getGameCover(title);
        if (isMounted) setCoverUrl(url);
      } catch (e) {
        console.error('Cover fetch error for', title);
      } finally {
        if (isMounted) setLoadingImage(false);
      }
    }
    fetchCover();

    return () => {
      isMounted = false;
    };
  }, [initialCoverUrl, title]);

  return (
    <Card
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="animate-card-fade"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isDark ? 'rgba(14, 18, 29, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '22px',
        p: 1.25,
        border: '1px solid',
        borderColor: isHovered
          ? platformStyle.color
          : isDark
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.08)',
        boxShadow: isHovered
          ? `0 28px 50px -15px rgba(0, 0, 0, 0.65), 0 0 35px -5px ${platformStyle.color}50, inset 0 1px 0 rgba(255,255,255,0.15)`
          : isDark
          ? '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          : '0 8px 20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: `all 0.35s ${springEasing}`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 1. CINEMATIC POSTER (2:3 Aspect Ratio) */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '2/3',
          borderRadius: '16px',
          bgcolor: isDark ? '#05070c' : '#f1f5f9',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {loadingImage ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)' }}
          />
        ) : coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            loading="lazy"
            onError={() => setCoverUrl(null)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: `transform 0.5s ${springEasing}, filter 0.35s ease`,
              transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
              filter: isHovered ? 'contrast(1.05) brightness(1.05)' : 'none',
            }}
          />
        ) : (
          /* Fallback Stylized Poster Art */
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDark
                ? 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #05070c 100%)'
                : 'linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 50%, #cbd5e1 100%)',
              p: 2.5,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: '18px',
                bgcolor: isDark ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
                mb: 1.5,
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.25)',
              }}
            >
              <SportsEsportsRoundedIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight="800"
              sx={{
                color: isDark ? '#f8fafc' : '#1e293b',
                lineHeight: 1.25,
                fontSize: '0.92rem',
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              fontWeight="800"
              sx={{
                color: platformStyle.color,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                mt: 0.8,
                fontSize: '0.68rem',
              }}
            >
              {platform}
            </Typography>
          </Box>
        )}

        {/* Poster Bottom Dark Gradient Overlay for Seamless Legibility */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(to top, rgba(7, 9, 14, 0.9) 0%, rgba(7, 9, 14, 0.4) 60%, transparent 100%)',
            pointerEvents: 'none',
            opacity: isDark ? 0.9 : 0.6,
          }}
        />

        {/* Top-Left: Modern Glass Status Capsule */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 3,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.7,
              px: 1.1,
              py: 0.4,
              borderRadius: '9px',
              bgcolor: 'rgba(7, 9, 14, 0.82)',
              backdropFilter: 'blur(16px)',
              border: '1px solid',
              borderColor: statusStyle.borderColor,
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: statusStyle.color,
                boxShadow: `0 0 8px ${statusStyle.color}`,
              }}
            />
            <Typography
              sx={{
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                color: '#ffffff',
                lineHeight: 1,
              }}
            >
              {statusStyle.label}
            </Typography>
          </Box>
        </Box>

        {/* Top-Right: Quick Actions (Favorite, Edit, Delete, Expand) */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            zIndex: 4,
          }}
        >
          {/* Quick Favorite Star Button */}
          {onToggleFavorite && (
            <Tooltip
              title={isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
              arrow
              placement="top"
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '11px',
                  bgcolor: 'rgba(7, 9, 14, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid',
                  borderColor: isFavorite ? 'rgba(234, 179, 8, 0.6)' : 'rgba(255, 255, 255, 0.12)',
                  color: isFavorite ? '#eab308' : '#94a3b8',
                  boxShadow: isFavorite
                    ? '0 0 16px rgba(234, 179, 8, 0.5)'
                    : '0 4px 12px rgba(0,0,0,0.3)',
                  opacity: isFavorite || isHovered ? 1 : 0,
                  transform: isFavorite || isHovered ? 'scale(1)' : 'scale(0.8)',
                  transition: `all 0.25s ${springEasing}`,
                  '&:hover': {
                    transform: 'scale(1.15)',
                    color: '#eab308',
                    borderColor: '#eab308',
                  },
                }}
              >
                {isFavorite ? (
                  <StarRoundedIcon sx={{ fontSize: 19 }} />
                ) : (
                  <StarBorderRoundedIcon sx={{ fontSize: 19 }} />
                )}
              </IconButton>
            </Tooltip>
          )}

          {/* Quick Actions Hover Capsule */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.4,
              p: '3px 5px',
              borderRadius: '11px',
              bgcolor: 'rgba(7, 9, 14, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(-6px)',
              transition: `all 0.25s ${springEasing}`,
            }}
          >
            <Tooltip title="Editar juego" arrow placement="top">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                size="small"
                sx={{
                  width: 25,
                  height: 25,
                  color: '#94a3b8',
                  '&:hover': {
                    color: '#38bdf8',
                    bgcolor: 'rgba(56, 189, 248, 0.2)',
                  },
                }}
              >
                <EditRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Eliminar juego" arrow placement="top">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                size="small"
                sx={{
                  width: 25,
                  height: 25,
                  color: '#94a3b8',
                  '&:hover': {
                    color: '#f87171',
                    bgcolor: 'rgba(248, 113, 113, 0.2)',
                  },
                }}
              >
                <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Hover Hint to View Full Details */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1,
            py: 0.35,
            borderRadius: '8px',
            bgcolor: 'rgba(7, 9, 14, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#cbd5e1',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            transition: `all 0.25s ${springEasing}`,
          }}
        >
          <OpenInFullRoundedIcon sx={{ fontSize: 12 }} />
          <Typography sx={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.04em' }}>
            VER
          </Typography>
        </Box>
      </Box>

      {/* 2. DEDICATED CLEAN INFO FOOTER */}
      <Box sx={{ pt: 1.4, pb: 0.6, px: 0.6 }}>
        {/* Game Title */}
        <Tooltip title={title} placement="top" arrow enterDelay={400}>
          <Typography
            variant="subtitle1"
            fontWeight="800"
            noWrap
            sx={{
              color: isDark ? '#f8fafc' : '#0f172a',
              fontFamily: '"Outfit", sans-serif',
              fontSize: '1.02rem',
              letterSpacing: '-0.015em',
              lineHeight: 1.25,
              mb: 0.8,
              transition: 'color 0.2s ease',
              '&:hover': { color: platformStyle.color },
            }}
          >
            {title}
          </Typography>
        </Tooltip>

        {/* Rating and Hours Row */}
        {(rating || (hoursPlayed && hoursPlayed > 0)) && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={0.9}
            sx={{ minHeight: 22 }}
          >
            {rating ? (
              <Rating
                value={rating}
                readOnly
                size="small"
                sx={{
                  fontSize: '0.95rem',
                  '& .MuiRating-iconFilled': { color: '#f59e0b' },
                }}
              />
            ) : (
              <Box />
            )}

            {hoursPlayed && hoursPlayed > 0 ? (
              <Box
                display="flex"
                alignItems="center"
                gap={0.4}
                sx={{
                  px: 0.9,
                  py: 0.25,
                  borderRadius: '7px',
                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  color: isDark ? '#cbd5e1' : '#475569',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                }}
              >
                <AccessTimeRoundedIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                <span>{hoursPlayed}h</span>
              </Box>
            ) : null}
          </Box>
        )}

        {/* Platform Badge & Glow Dot */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Chip
            label={platformStyle.label}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              borderRadius: '7px',
              color: platformStyle.color,
              bgcolor: platformStyle.bgColor,
              border: '1px solid',
              borderColor: platformStyle.borderColor,
            }}
          />

          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              bgcolor: platformStyle.color,
              boxShadow: `0 0 10px ${platformStyle.color}`,
              opacity: isHovered ? 1 : 0.45,
              transition: 'all 0.25s ease',
            }}
          />
        </Box>
      </Box>
    </Card>
  );
}
