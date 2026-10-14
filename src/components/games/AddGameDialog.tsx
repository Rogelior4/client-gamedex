import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  Fade,
  useTheme,
  IconButton,
  Rating,
  Tooltip,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import { GameStatus, CreateGameData, GameSuggestion } from "../../types/game.types";
import { STATUS_OPTIONS, getStatusStyle } from "../../utils/statusStyles";
import { getPlatformStyle } from "../../utils/platformStyles";
import { STORE_SEARCH_PROVIDERS } from "../../constants/game.constants";
import { searchGames } from "../../services/game.service";

interface AddGameDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: CreateGameData) => void;
}

function getAutoAssignedPlatform(storeId: string, title?: string): string {
  const t = (title || "").toLowerCase();
  if (
    t.includes("spirit tracks") ||
    t.includes("phantom hourglass") ||
    t.includes("mario kart ds") ||
    t.includes("super mario 64 ds") ||
    t.includes("new super mario bros.") ||
    t.includes("pokemon platinum") ||
    t.includes("heartgold") ||
    t.includes("soulsilver") ||
    t.includes("black and white") ||
    t.includes("diamond and pearl") ||
    (t.includes("ds") && !t.includes("3ds"))
  ) {
    return "Nintendo DS";
  }
  if (t.includes("3ds") || t.includes("link between worlds") || t.includes("ocarina of time 3d")) {
    return "Nintendo 3DS";
  }
  if (t.includes("n64") || t.includes("ocarina of time") || t.includes("majora's mask")) {
    return "Nintendo 64";
  }
  if (t.includes("gamecube") || t.includes("wind waker") || t.includes("melee") || t.includes("sunshine")) {
    return "GameCube";
  }
  if (t.includes("wii u")) {
    return "Wii U";
  }
  if (t.includes("wii") || t.includes("twilight princess")) {
    return "Wii";
  }
  if (t.includes("gba") || t.includes("game boy advance") || t.includes("minish cap")) {
    return "Game Boy Advance";
  }
  if (t.includes("snes") || t.includes("link to the past")) {
    return "Super Nintendo (SNES)";
  }

  // Nintendo Switch flagships & franchise keywords
  if (
    t.includes("zelda") ||
    t.includes("mario") ||
    t.includes("pokemon") ||
    t.includes("pokémon") ||
    t.includes("metroid") ||
    t.includes("kirby") ||
    t.includes("smash bros") ||
    t.includes("animal crossing") ||
    t.includes("splatoon") ||
    t.includes("xenoblade") ||
    t.includes("fire emblem") ||
    t.includes("donkey kong") ||
    t.includes("pikmin") ||
    t.includes("luigi") ||
    t.includes("bayonetta") ||
    storeId === "nintendo"
  ) {
    return "Nintendo Switch";
  }

  // PlayStation Exclusives
  if (
    t.includes("god of war") ||
    t.includes("spider-man") ||
    t.includes("spiderman") ||
    t.includes("the last of us") ||
    t.includes("bloodborne") ||
    t.includes("uncharted") ||
    t.includes("gran turismo") ||
    t.includes("ghost of tsushima") ||
    t.includes("ratchet") ||
    t.includes("horizon zero") ||
    t.includes("horizon forbidden") ||
    storeId === "playstation"
  ) {
    return "PlayStation 5";
  }

  // Xbox Exclusives
  if (
    t.includes("halo") ||
    t.includes("gears of war") ||
    t.includes("forza") ||
    t.includes("starfield") ||
    storeId === "xbox"
  ) {
    return "Xbox";
  }

  // Specific PC stores
  if (storeId === "steam") return "Steam";
  if (storeId === "epic") return "Epic Games";
  if (storeId === "riot") return "Riot Games";
  if (storeId === "battlenet") return "Battle.net";
  if (storeId === "ea") return "EA App";
  if (storeId === "ubisoft") return "Ubisoft Connect";

  // PC Launcher / games
  if (t.includes("valorant") || t.includes("league of legends") || t.includes("teamfight tactics")) return "Riot Games";
  if (t.includes("world of warcraft") || t.includes("overwatch") || t.includes("diablo") || t.includes("starcraft")) return "Battle.net";
  if (t.includes("counter-strike") || t.includes("dota 2") || t.includes("half-life") || t.includes("portal")) return "Steam";
  if (t.includes("fortnite")) return "Epic Games";

  return "PC";
}

function SafeOptionThumbnail({ src, isDark }: { src?: string | null; isDark: boolean }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <Box
        sx={{
          width: 52,
          height: 34,
          borderRadius: "6px",
          bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <SportsEsportsRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      onError={() => setError(true)}
      sx={{
        width: 52,
        height: 34,
        borderRadius: "6px",
        objectFit: "cover",
        flexShrink: 0,
        border: "1px solid",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        bgcolor: isDark ? "#090d16" : "#f1f5f9",
      }}
    />
  );
}

export default function AddGameDialog({
  open,
  onClose,
  onAdd,
}: AddGameDialogProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [title, setTitle] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedStore, setSelectedStore] = useState("all");
  const [suggestions, setSuggestions] = useState<GameSuggestion[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [platform, setPlatform] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [status, setStatus] = useState<GameStatus>("BACKLOG");
  const [rating, setRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hoursPlayed, setHoursPlayed] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setTitle("");
      setInputValue("");
      setSelectedStore("all");
      setSuggestions([]);
      setPlatform("");
      setCoverUrl("");
      setStatus("BACKLOG");
      setRating(null);
      setIsFavorite(false);
      setHoursPlayed("");
    }
  }, [open]);

  // Debounced live search with multi-store API
  useEffect(() => {
    if (!inputValue || inputValue.trim().length < 2) {
      setSuggestions([]);
      setLoadingSearch(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingSearch(true);
      const results = await searchGames(inputValue, selectedStore);
      setSuggestions(results);
      setLoadingSearch(false);
    }, 320);

    return () => clearTimeout(timer);
  }, [inputValue, selectedStore]);

  const handleSubmit = () => {
    const finalTitle = title.trim() || inputValue.trim();
    const finalPlatform = platform.trim() || getAutoAssignedPlatform(selectedStore, finalTitle);
    if (finalTitle && finalPlatform) {
      onAdd({
        title: finalTitle,
        platform: finalPlatform,
        coverUrl: coverUrl.trim() ? coverUrl.trim() : undefined,
        status,
        rating: rating || null,
        isFavorite,
        hoursPlayed: hoursPlayed ? parseInt(hoursPlayed, 10) : null,
      });
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (title.trim() || inputValue.trim())) {
      handleSubmit();
    }
  };

  const effectivePlatform = platform || (inputValue.trim() ? getAutoAssignedPlatform(selectedStore, inputValue) : "");
  const pStyle = effectivePlatform ? getPlatformStyle(effectivePlatform, isDark) : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Fade}
      transitionDuration={250}
      PaperProps={{
        sx: {
          borderRadius: "26px",
          bgcolor: isDark ? "rgba(11, 15, 25, 0.96)" : "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid",
          borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
          boxShadow: isDark
            ? "0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(99, 102, 241, 0.2)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1, pt: 2 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "#0f172a",
            border: "1px solid",
            borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDark ? "#f4f4f5" : "#ffffff",
          }}
        >
          <SportsEsportsRoundedIcon />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="800" sx={{ lineHeight: 1.2 }}>
            Añadir Videojuego
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Búsqueda universal multi-tienda con plataforma preasignada
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: "16px !important", display: "flex", flexDirection: "column", gap: 2.2 }}>
        {/* Store filter selector */}
        <Box>
          <Box display="flex" alignItems="center" gap={0.8} mb={0.8}>
            <StorefrontRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="caption" fontWeight="700" color="text.secondary">
              Buscar en plataforma o tienda:
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 0.8,
              overflowX: "auto",
              pb: 0.8,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {STORE_SEARCH_PROVIDERS.map((store) => {
              const isSelected = selectedStore === store.id;
              return (
                <Chip
                  key={store.id}
                  label={store.label}
                  size="small"
                  onClick={() => setSelectedStore(store.id)}
                  clickable
                  sx={{
                    borderRadius: "8px",
                    fontSize: "0.72rem",
                    fontWeight: isSelected ? 800 : 500,
                    bgcolor: isSelected
                      ? isDark
                        ? `${store.color}25`
                        : `${store.color}15`
                      : isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)",
                    color: isSelected ? store.color : "text.secondary",
                    border: "1px solid",
                    borderColor: isSelected ? store.color : "transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: `${store.color}20`,
                      color: store.color,
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Universal Multi-Store Autocomplete Title Input */}
        <Autocomplete
          freeSolo
          options={suggestions}
          loading={loadingSearch}
          filterOptions={(options) => options}
          getOptionLabel={(option) => (typeof option === "string" ? option : option.title)}
          inputValue={inputValue}
          onInputChange={(event, newInputValue, reason) => {
            setInputValue(newInputValue);
            setTitle(newInputValue);
            if (reason === "input" || reason === "clear") {
              setPlatform(getAutoAssignedPlatform(selectedStore, newInputValue));
            }
          }}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setTitle(newValue);
              setInputValue(newValue);
              setPlatform(getAutoAssignedPlatform(selectedStore, newValue));
            } else if (newValue && typeof newValue === "object") {
              setTitle(newValue.title);
              setInputValue(newValue.title);
              if (newValue.coverUrl) {
                setCoverUrl(newValue.coverUrl);
              }
              setPlatform(newValue.platform || getAutoAssignedPlatform(selectedStore, newValue.title));
            }
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            const optionStyle = getPlatformStyle(option.platform, isDark);
            const coverImage = option.tinyImage || option.coverUrl || option.headerUrl;

            return (
              <Box
                component="li"
                key={key}
                {...optionProps}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: "8px 12px !important",
                  borderRadius: "10px",
                  mx: 0.5,
                  my: 0.3,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: isDark
                      ? "rgba(99, 102, 241, 0.15) !important"
                      : "rgba(99, 102, 241, 0.08) !important",
                  },
                }}
              >
                <SafeOptionThumbnail src={coverImage} isDark={isDark} />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight="700" noWrap>
                    {option.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", fontSize: "0.7rem" }}
                  >
                    {option.releaseDate ? `Lanzamiento: ${option.releaseDate} • ` : ""}
                    {option.source.toUpperCase()}
                  </Typography>
                </Box>
                <Chip
                  label={option.platform || optionStyle.label}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    bgcolor: optionStyle.bgColor,
                    color: optionStyle.color,
                    border: `1px solid ${optionStyle.borderColor}`,
                    borderRadius: "6px",
                  }}
                />
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              label="Título del Videojuego"
              placeholder="Buscar título (ej. The Legend of Zelda: Spirit Tracks, Valorant...)"
              fullWidth
              variant="outlined"
              onKeyDown={handleKeyDown}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingSearch ? (
                      <CircularProgress color="primary" size={20} sx={{ mr: 1 }} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
            />
          )}
        />

        {/* Live Cover Preview if detected or selected */}
        {coverUrl && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.2,
              borderRadius: "14px",
              bgcolor: isDark ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.05)",
              border: "1px solid",
              borderColor: isDark ? "rgba(99, 102, 241, 0.25)" : "rgba(99, 102, 241, 0.2)",
            }}
          >
            <Box
              component="img"
              src={coverUrl}
              onError={(e: any) => {
                e.currentTarget.style.visibility = 'hidden';
              }}
              sx={{
                width: 44,
                height: 64,
                borderRadius: "8px",
                objectFit: "cover",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Box display="flex" alignItems="center" gap={0.5} mb={0.3}>
                <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: "#38bdf8" }} />
                <Typography variant="caption" color="primary.main" fontWeight="800">
                  Carátula vinculada automáticamente
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight="700" noWrap>
                {title || inputValue || "Videojuego"}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                display="block"
                sx={{ maxWidth: 220 }}
              >
                {coverUrl}
              </Typography>
            </Box>
            <Tooltip title="Quitar carátula vinculada" arrow>
              <IconButton size="small" onClick={() => setCoverUrl("")} sx={{ color: "text.secondary" }}>
                <CloseRoundedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Pre-assigned Platform Display (Read-Only / Auto-Locked) */}
        <Box
          sx={{
            p: 1.8,
            borderRadius: "16px",
            bgcolor: effectivePlatform
              ? isDark
                ? "rgba(255, 255, 255, 0.04)"
                : "rgba(0, 0, 0, 0.02)"
              : isDark
              ? "rgba(255, 255, 255, 0.02)"
              : "rgba(0, 0, 0, 0.015)",
            border: "1px solid",
            borderColor: effectivePlatform
              ? isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.08)"
              : isDark
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "11px",
                bgcolor: pStyle ? pStyle.bgColor : isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                color: pStyle ? pStyle.color : "text.disabled",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",
                borderColor: pStyle ? pStyle.borderColor : "transparent",
              }}
            >
              <SportsEsportsRoundedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                variant="caption"
                fontWeight="700"
                sx={{
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  fontSize: "0.68rem",
                }}
              >
                <LockRoundedIcon sx={{ fontSize: 13, color: effectivePlatform ? "#10b981" : "text.secondary" }} />
                Plataforma Preasignada
              </Typography>
              <Typography
                variant="body1"
                fontWeight="800"
                sx={{
                  color: effectivePlatform ? "text.primary" : "text.disabled",
                  lineHeight: 1.2,
                }}
              >
                {effectivePlatform || "Selecciona un videojuego para preasignar"}
              </Typography>
            </Box>
          </Box>

          {effectivePlatform && pStyle && (
            <Chip
              label={pStyle.label || effectivePlatform}
              size="small"
              sx={{
                height: 28,
                fontWeight: 800,
                fontSize: "0.75rem",
                borderRadius: "8px",
                bgcolor: pStyle.bgColor,
                color: pStyle.color,
                border: `1px solid ${pStyle.borderColor}`,
              }}
            />
          )}
        </Box>

        {/* Status Selector */}
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight="700"
            sx={{ display: "block", mb: 0.8, textTransform: "uppercase", letterSpacing: 0.5 }}
          >
            Estado del Juego:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.8}>
            {STATUS_OPTIONS.map((opt) => {
              const isSelected = status === opt.id;
              const style = getStatusStyle(opt.id, isDark);
              return (
                <Chip
                  key={opt.id}
                  label={opt.label}
                  size="small"
                  onClick={() => setStatus(opt.id)}
                  clickable
                  sx={{
                    borderRadius: "8px",
                    fontWeight: isSelected ? 800 : 500,
                    bgcolor: isSelected
                      ? style.bgColor
                      : isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)",
                    color: isSelected ? style.color : "text.secondary",
                    border: "1px solid",
                    borderColor: isSelected ? style.borderColor : "transparent",
                    boxShadow: isSelected ? `0 0 10px ${style.color}35` : "none",
                    "&:hover": {
                      bgcolor: style.bgColor,
                      color: style.color,
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Rating & Favorite Row */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1.5}
          borderRadius="14px"
          sx={{
            bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight="700" display="block">
              Calificación Personal
            </Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              icon={<StarRoundedIcon sx={{ color: "#f59e0b" }} />}
              emptyIcon={<StarBorderRoundedIcon sx={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }} />}
            />
          </Box>

          <Button
            onClick={() => setIsFavorite(!isFavorite)}
            variant={isFavorite ? "contained" : "outlined"}
            startIcon={isFavorite ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
            sx={{
              borderRadius: "12px",
              bgcolor: isFavorite ? "#f43f5e" : "transparent",
              color: isFavorite ? "white" : "text.secondary",
              borderColor: isFavorite ? "#f43f5e" : isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
              fontWeight: "700",
              "&:hover": {
                bgcolor: isFavorite ? "#e11d48" : "rgba(244, 63, 94, 0.1)",
                borderColor: "#f43f5e",
                color: isFavorite ? "white" : "#f43f5e",
              },
            }}
          >
            {isFavorite ? "Favorito" : "Marcar Favorito"}
          </Button>
        </Box>

        {/* Hours Played Input */}
        <TextField
          label="Horas Jugadas (Opcional)"
          placeholder="ej. 24"
          type="number"
          fullWidth
          variant="outlined"
          value={hoursPlayed}
          onChange={(e) => setHoursPlayed(e.target.value)}
          onKeyDown={handleKeyDown}
          inputProps={{ min: 0 }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
          }}
        />

        {/* Manual Cover URL Accordion/Input */}
        {!coverUrl && (
          <TextField
            label="URL de Carátula Personalizada (Opcional)"
            placeholder="https://... (o deja que GameDex la detecte automáticamente)"
            fullWidth
            variant="outlined"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            helperText="Si lo dejas vacío, GameDex buscará la carátula oficial en la tienda correspondiente a la plataforma."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
              },
              "& .MuiFormHelperText-root": {
                fontSize: "0.75rem",
                color: "text.secondary",
              },
            }}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: "12px",
            px: 2.5,
            color: "text.secondary",
            fontWeight: "600",
            textTransform: "none",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!(title.trim() || inputValue.trim())}
          startIcon={<AddRoundedIcon />}
          sx={{
            borderRadius: "10px",
            px: 2.5,
            py: 0.9,
            fontWeight: "700",
            textTransform: "none",
            bgcolor: isDark ? "#232734" : "#0f172a",
            color: "#f8fafc",
            border: "1px solid",
            borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "transparent",
            boxShadow: "none",
            "&:hover": {
              bgcolor: isDark ? "#2f3445" : "#1e293b",
            },
            "&:disabled": {
              bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              color: isDark ? "#71717a" : "#94a3b8",
            },
          }}
        >
          Guardar Juego
        </Button>
      </DialogActions>
    </Dialog>
  );
}
