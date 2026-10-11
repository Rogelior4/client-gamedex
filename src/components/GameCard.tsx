import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Chip,
  Box,
  IconButton,
  Skeleton,
  Tooltip,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import { useTheme } from "@mui/material/styles";
import { getGameCover } from "../services/game.service";
import { getPlatformStyle } from "../utils/platformStyles";

interface GameCardProps {
  title: string;
  platform: string;
  onEdit: () => void;
  onDelete: () => void;
}

const smoothTransition = "cubic-bezier(0.2, 0.8, 0.2, 1)";

export default function GameCard({
  title,
  platform,
  onEdit,
  onDelete,
}: GameCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const platformStyle = getPlatformStyle(platform, isDark);

  useEffect(() => {
    let isMounted = true;

    async function fetchCover() {
      try {
        const url = await getGameCover(title);
        if (isMounted) {
          setCoverUrl(url);
        }
      } catch (e) {
        console.error("Cover fetch error for", title);
      } finally {
        if (isMounted) {
          setLoadingImage(false);
        }
      }
    }
    fetchCover();

    return () => {
      isMounted = false;
    };
  }, [title]);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: isDark ? "rgba(19, 27, 46, 0.75)" : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        borderRadius: "22px",
        p: 1.25,
        border: "1px solid",
        borderColor: isHovered
          ? platformStyle.color
          : isDark
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(0, 0, 0, 0.08)",
        boxShadow: isHovered
          ? `0 24px 40px -12px rgba(0,0,0,0.5), 0 0 25px -4px ${platformStyle.color}45`
          : isDark
          ? "0 6px 20px rgba(0, 0, 0, 0.35)"
          : "0 6px 18px rgba(0, 0, 0, 0.05)",
        transform: isHovered ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
        transition: `all 0.35s ${smoothTransition}`,
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* 1. PURE, UNOBSTRUCTED POSTER CONTAINER (2:3 Aspect Ratio) */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "2/3",
          borderRadius: "16px",
          bgcolor: isDark ? "#080c16" : "#f1f5f9",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {loadingImage ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
            }}
          />
        ) : coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            loading="lazy"
            onError={() => setCoverUrl(null)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: `transform 0.5s ${smoothTransition}, filter 0.35s ease`,
              transform: isHovered ? "scale(1.06)" : "scale(1.0)",
              filter: isHovered ? "contrast(1.04) brightness(1.04)" : "none",
            }}
          />
        ) : (
          /* Fallback Stylized Poster Art when no Steam image exists */
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: isDark
                ? "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #030712 100%)"
                : "linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 50%, #cbd5e1 100%)",
              p: 2.5,
              textAlign: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "20px",
                bgcolor: isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.main",
                mb: 2,
              }}
            >
              <SportsEsportsRoundedIcon sx={{ fontSize: 36 }} />
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight="800"
              sx={{
                color: isDark ? "#e2e8f0" : "#334155",
                lineHeight: 1.2,
                fontSize: "0.95rem",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              fontWeight="700"
              sx={{
                color: platformStyle.color,
                letterSpacing: 1,
                textTransform: "uppercase",
                mt: 1,
              }}
            >
              {platform}
            </Typography>
          </Box>
        )}

        {/* Floating Actions (Revealed only on hover, discrete top-right glass pill) */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            p: "4px 6px",
            borderRadius: "12px",
            bgcolor: isDark ? "rgba(11, 15, 25, 0.88)" : "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(-6px)",
            transition: `all 0.25s ${smoothTransition}`,
            zIndex: 4,
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
                width: 28,
                height: 28,
                color: isDark ? "#94a3b8" : "#64748b",
                "&:hover": {
                  color: "#38bdf8",
                  bgcolor: "rgba(56, 189, 248, 0.15)",
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
                width: 28,
                height: 28,
                color: isDark ? "#94a3b8" : "#64748b",
                "&:hover": {
                  color: "#f87171",
                  bgcolor: "rgba(248, 113, 113, 0.15)",
                },
              }}
            >
              <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* 2. DEDICATED CLEAN INFO FOOTER (COMPLETELY OUTSIDE THE POSTER ART) */}
      <Box sx={{ pt: 1.5, pb: 0.5, px: 0.5 }}>
        <Tooltip title={title} placement="top" arrow enterDelay={400}>
          <Typography
            variant="subtitle1"
            fontWeight="700"
            noWrap
            sx={{
              color: isDark ? "#f8fafc" : "#0f172a",
              fontSize: "0.98rem",
              lineHeight: 1.2,
              mb: 0.8,
              transition: `color 0.25s ease`,
              "&:hover": {
                color: platformStyle.color,
              },
            }}
          >
            {title}
          </Typography>
        </Tooltip>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Chip
            label={platformStyle.label}
            size="small"
            sx={{
              height: 22,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: 0.3,
              borderRadius: "7px",
              color: platformStyle.color,
              bgcolor: platformStyle.bgColor,
              border: "1px solid",
              borderColor: platformStyle.borderColor,
            }}
          />

          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: platformStyle.color,
              boxShadow: `0 0 8px ${platformStyle.color}`,
              opacity: isHovered ? 1 : 0.4,
              transition: "opacity 0.25s ease",
            }}
          />
        </Box>
      </Box>
    </Card>
  );
}
