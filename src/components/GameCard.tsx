import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
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
        bgcolor: isDark ? "#0f172a" : "#ffffff",
        color: "text.primary",
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        border: "1px solid",
        borderColor: isHovered
          ? platformStyle.color
          : isDark
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(0, 0, 0, 0.08)",
        boxShadow: isHovered
          ? `0 20px 35px -8px rgba(0,0,0,0.5), 0 0 25px -4px ${platformStyle.color}45`
          : isDark
          ? "0 4px 20px rgba(0, 0, 0, 0.4)"
          : "0 4px 15px rgba(0, 0, 0, 0.06)",
        transform: isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: `all 0.35s ${smoothTransition}`,
        cursor: "pointer",
        zIndex: isHovered ? 10 : 1,
      }}
    >
      {/* Cover Image Container (2:3 Vertical Poster Aspect Ratio) */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "2/3",
          bgcolor: isDark ? "#050811" : "#f1f5f9",
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
              bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)",
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
              transition: `transform 0.45s ${smoothTransition}, filter 0.35s ease`,
              transform: isHovered ? "scale(1.08)" : "scale(1.0)",
              filter: isHovered ? "brightness(1.06)" : "brightness(0.98)",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: isDark
                ? "radial-gradient(circle at 50% 30%, #1e293b 0%, #020617 100%)"
                : "radial-gradient(circle at 50% 30%, #e2e8f0 0%, #cbd5e1 100%)",
              color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
              p: 2,
              textAlign: "center",
            }}
          >
            <SportsEsportsRoundedIcon sx={{ fontSize: 56, mb: 1, opacity: 0.8 }} />
            <Typography variant="caption" fontWeight="600" sx={{ letterSpacing: 1, textTransform: "uppercase" }}>
              {platform}
            </Typography>
          </Box>
        )}

        {/* Floating Actions Pill (Top Right, revealed on hover) */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            p: "4px 6px",
            borderRadius: "12px",
            bgcolor: isDark ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
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
                width: 30,
                height: 30,
                color: isDark ? "#94a3b8" : "#64748b",
                "&:hover": {
                  color: "#38bdf8",
                  bgcolor: "rgba(56, 189, 248, 0.15)",
                },
              }}
            >
              <EditRoundedIcon sx={{ fontSize: 18 }} />
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
                width: 30,
                height: 30,
                color: isDark ? "#94a3b8" : "#64748b",
                "&:hover": {
                  color: "#f87171",
                  bgcolor: "rgba(248, 113, 113, 0.15)",
                },
              }}
            >
              <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Ambient Darkened Gradient at bottom for text readability */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "75%",
            background: isDark
              ? "linear-gradient(to top, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.6) 50%, transparent 100%)"
              : "linear-gradient(to top, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* Card Info Overlay */}
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 3,
          p: 2,
          pb: "16px !important",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="700"
          sx={{
            lineHeight: 1.25,
            mb: 1,
            color: isDark ? "#f8fafc" : "#0f172a",
            fontSize: "1.05rem",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: isHovered ? 2 : 1,
            textShadow: isDark ? "0 2px 4px rgba(0,0,0,0.8)" : "none",
            transition: `all 0.25s ${smoothTransition}`,
          }}
        >
          {title}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Chip
            label={platformStyle.label}
            size="small"
            sx={{
              height: 24,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: 0.5,
              borderRadius: "8px",
              color: platformStyle.color,
              bgcolor: platformStyle.bgColor,
              border: "1px solid",
              borderColor: platformStyle.borderColor,
              backdropFilter: "blur(8px)",
              transition: `all 0.25s ${smoothTransition}`,
            }}
          />

          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: platformStyle.color,
              boxShadow: `0 0 10px ${platformStyle.color}`,
              opacity: isHovered ? 1 : 0.4,
              transition: "opacity 0.25s ease",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
