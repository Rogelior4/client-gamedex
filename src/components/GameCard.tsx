import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Skeleton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { getGameCover } from "../services/game.service";

interface GameCardProps {
  title: string;
  platform: string;
  onEdit: () => void;
  onDelete: () => void;
}

const smoothTransition = "cubic-bezier(0.25, 0.8, 0.25, 1)";

export default function GameCard({ title, platform, onEdit, onDelete }: GameCardProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchCover() {
      try {
        const url = await getGameCover(title);
        if (isMounted) {
          setCoverUrl(url);
        }
      } catch (e) {
        console.error("No cover found");
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
        bgcolor: "#1e1e1e",
        color: "white",
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        boxShadow: isHovered
          ? "0 20px 40px rgba(0,0,0,0.7)"
          : "0 4px 10px rgba(0,0,0,0.3)",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: `all 0.4s ${smoothTransition}`,
        zIndex: isHovered ? 10 : 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "2/3",
          bgcolor: "#000",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {loadingImage ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ bgcolor: "grey.900" }}
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
              transition: `transform 0.4s ${smoothTransition}`,
              transform: isHovered ? "scale(1.08)" : "scale(1.0)",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(to bottom, #2c3e50, #000000)",
              color: "grey.700",
              transition: `transform 0.4s ${smoothTransition}`,
              transform: isHovered ? "scale(1.08)" : "scale(1.0)",
            }}
          >
            <VideogameAssetIcon sx={{ fontSize: 60, opacity: 0.5 }} />
          </Box>
        )}

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "60%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
            opacity: isHovered ? 0 : 1,
            transition: isHovered ? "opacity 0.3s ease" : "opacity 0.5s ease",
          }}
        />
      </Box>

      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 2,
          p: 2,
          pt: isHovered ? 3 : 2,
          background: isHovered
            ? "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.9) 25%, rgba(0,0,0,1) 100%)"
            : "transparent",
          backdropFilter: isHovered ? "blur(3px)" : "none",
          transition: isHovered
            ? `all 0.4s ${smoothTransition}`
            : `all 0.6s ${smoothTransition}`,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1}
        >
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                lineHeight: 1.2,
                mb: 0.5,
                color: "#fff",
                fontSize: "1rem",
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: isHovered ? 3 : 1,
                maxHeight: isHovered ? "85px" : "1.4em",
                transition: isHovered
                  ? `max-height 0.4s ${smoothTransition}`
                  : `max-height 0.6s ${smoothTransition}`,
                textShadow: isHovered ? "0 2px 4px rgba(0,0,0,0.8)" : "none",
              }}
            >
              {title}
            </Typography>

            <Chip
              label={platform}
              size="small"
              sx={{
                mt: 1,
                height: "20px",
                fontSize: "0.7rem",
                bgcolor: "rgba(255,255,255,0.1)",
                color: "#ccc",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: `all 0.3s ${smoothTransition}`,
              }}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={0.5}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              size="small"
              aria-label="edit game"
              sx={{
                color: "grey.500",
                opacity: isHovered ? 1 : 0.7,
                transition: "opacity 0.2s",
                "&:hover": {
                  color: "#60a5fa",
                  bgcolor: "rgba(96,165,250,0.15)",
                  opacity: 1,
                },
              }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              size="small"
              aria-label="delete game"
              sx={{
                color: "grey.500",
                opacity: isHovered ? 1 : 0.7,
                transition: "opacity 0.2s",
                "&:hover": {
                  color: "#ff4444",
                  bgcolor: "rgba(255,68,68,0.1)",
                  opacity: 1,
                },
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
