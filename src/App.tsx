import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Fab,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  TextField,
  Chip,
  Snackbar,
  Alert,
  createTheme,
  Button,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import GameCard from "./components/GameCard";
import AddGameDialog from "./components/AddGameDialog";
import EditGameDialog from "./components/EditGameDialog";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeContext } from "./theme/ThemeContext";

import {
  getGames,
  createGame,
  updateGame,
  deleteGame,
  Game,
} from "./services/game.service";

const PLATFORM_FILTERS = [
  { id: "ALL", label: "Todos", color: "#6366f1" },
  { id: "PC", label: "PC", color: "#38bdf8" },
  { id: "PLAYSTATION", label: "PlayStation", color: "#818cf8" },
  { id: "XBOX", label: "Xbox", color: "#4ade80" },
  { id: "NINTENDO", label: "Nintendo", color: "#fb7185" },
];

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('gamedex_theme_mode');
    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('gamedex_theme_mode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const isDark = mode === "dark";

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#4f46e5' : '#6366f1',
          },
          secondary: {
            main: '#38bdf8',
          },
          background: {
            default: mode === 'light' ? '#f8fafc' : '#0b0f19',
            paper: mode === 'light' ? '#ffffff' : '#111827',
          },
          text: {
            primary: mode === 'light' ? '#0f172a' : '#f8fafc',
            secondary: mode === 'light' ? '#64748b' : '#94a3b8',
          },
        },
        typography: {
          fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          h3: { fontWeight: 800 },
          h4: { fontWeight: 800 },
          h6: { fontWeight: 700 },
        },
        shape: {
          borderRadius: 16,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                textTransform: 'none',
                fontWeight: 600,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode],
  );

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePlatformFilter, setActivePlatformFilter] = useState("ALL");

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const showSnackbar = useCallback(
    (message: string, severity: "success" | "error") => {
      setSnackbar({ open: true, message, severity });
    },
    [],
  );

  const loadGames = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getGames();
      setGames(data);
    } catch (error) {
      showSnackbar("Error al conectar con la API de GameDex", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const handleAddGame = async (title: string, platform: string) => {
    try {
      await createGame(title, platform);
      showSnackbar(`"${title}" añadido a tu colección`, "success");
      loadGames();
    } catch (error) {
      showSnackbar("Error al crear el videojuego", "error");
    }
  };

  const handleUpdateGame = async (
    id: number,
    title: string,
    platform: string,
  ) => {
    try {
      await updateGame(id, { title, platform });
      showSnackbar(`"${title}" actualizado correctamente`, "success");
      loadGames();
    } catch (error) {
      showSnackbar("Error al actualizar el juego", "error");
    }
  };

  const handleDeleteGame = async (id: number) => {
    try {
      await deleteGame(id);
      showSnackbar("Juego eliminado de la colección", "success");
      loadGames();
    } catch (error) {
      showSnackbar("Error al eliminar el juego", "error");
    }
  };

  // Filter games based on search and platform
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.platform.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activePlatformFilter === "ALL") return true;

      const pLower = game.platform.toLowerCase();
      if (activePlatformFilter === "PC") return pLower.includes("pc") || pLower.includes("steam") || pLower.includes("windows");
      if (activePlatformFilter === "PLAYSTATION") return pLower.includes("ps") || pLower.includes("playstation");
      if (activePlatformFilter === "XBOX") return pLower.includes("xbox");
      if (activePlatformFilter === "NINTENDO") return pLower.includes("switch") || pLower.includes("nintendo");

      return true;
    });
  }, [games, searchTerm, activePlatformFilter]);

  // Unique platforms count
  const platformCount = useMemo(() => {
    const set = new Set(games.map((g) => g.platform.trim().toLowerCase()));
    return set.size;
  }, [games]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Ambient Top Glow Light */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: "350px",
            background: isDark
              ? "radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.18) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 75%)"
              : "radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.08) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 75%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Floating Glassmorphic Navigation Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: isDark ? "rgba(11, 15, 25, 0.8)" : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid",
            borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
            color: "text.primary",
            zIndex: 1100,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ height: 80, px: { xs: 0 } }}>
              {/* Logo & Brand */}
              <Box display="flex" alignItems="center" gap={1.5} sx={{ cursor: "pointer" }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                    transition: "transform 0.25s ease",
                    "&:hover": { transform: "scale(1.05) rotate(-3deg)" },
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
                        letterSpacing: "-0.5px",
                        background: isDark
                          ? "linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)"
                          : "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      GameDex
                    </Typography>
                    <Chip
                      label="VAULT"
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        letterSpacing: 1,
                        bgcolor: "rgba(99, 102, 241, 0.15)",
                        color: "primary.main",
                        border: "1px solid rgba(99, 102, 241, 0.3)",
                        borderRadius: "6px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              {/* Integrated Search Bar */}
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                  border: "1px solid",
                  borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
                  borderRadius: "14px",
                  px: 2,
                  py: 0.5,
                  width: { sm: 260, md: 360 },
                  transition: "all 0.25s ease",
                  "&:focus-within": {
                    bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 1)",
                    borderColor: "primary.main",
                    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.15)",
                    width: { sm: 300, md: 400 },
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Buscar juegos o plataformas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm ? (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchTerm("")}>
                          <CloseRoundedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                    style: { fontSize: "0.95rem" },
                  }}
                />
              </Box>

              {/* Header Actions */}
              <Box display="flex" alignItems="center" gap={1.5} ml={2}>
                <Button
                  variant="contained"
                  onClick={() => setOpenAddDialog(true)}
                  startIcon={<AddRoundedIcon />}
                  sx={{
                    display: { xs: "none", md: "inline-flex" },
                    background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
                    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.35)",
                    borderRadius: "12px",
                    px: 2.5,
                    py: 1,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)",
                      boxShadow: "0 6px 20px rgba(99, 102, 241, 0.5)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  Nuevo Juego
                </Button>

                <ThemeToggle />
              </Box>
            </Toolbar>

            {/* Mobile Search Input */}
            <Box sx={{ display: { xs: "block", sm: "none" }, pb: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar juegos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  },
                }}
              />
            </Box>
          </Container>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 12, position: "relative", zIndex: 1 }}>
          {/* Hero Banner Section */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 4,
              borderRadius: "28px",
              bgcolor: isDark ? "rgba(17, 24, 39, 0.7)" : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid",
              borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
              boxShadow: isDark
                ? "0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
                : "0 20px 40px -15px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle decorative glow element */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 250,
                height: 250,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              gap={3}
            >
              <Box>
                <Box display="flex" alignItems="center" gap={1.2} mb={1}>
                  <Chip
                    icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />}
                    label="LIBRERÍA PERSONAL"
                    size="small"
                    sx={{
                      height: 26,
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      letterSpacing: 1,
                      bgcolor: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(2, 132, 199, 0.08)",
                      color: isDark ? "#38bdf8" : "#0284c7",
                      border: "1px solid",
                      borderColor: isDark ? "rgba(56, 189, 248, 0.25)" : "rgba(2, 132, 199, 0.2)",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.8rem", sm: "2.4rem", md: "2.8rem" },
                    fontWeight: 900,
                    letterSpacing: "-0.5px",
                    lineHeight: 1.15,
                    mb: 1,
                    background: isDark
                      ? "linear-gradient(135deg, #ffffff 20%, #94a3b8 100%)"
                      : "linear-gradient(135deg, #0f172a 20%, #475569 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {searchTerm ? "Resultados de Búsqueda" : "Tu Colección Gamer"}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 650, fontSize: "1.05rem" }}>
                  Catálogo centralizado de tus videojuegos con carátulas dinámicas sincronizadas en tiempo real desde Steam.
                </Typography>
              </Box>

              {/* Stats badges */}
              <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
                <Paper
                  elevation={0}
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    borderRadius: "16px",
                    bgcolor: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                    border: "1px solid",
                    borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h5" fontWeight="900" color="primary.main" sx={{ lineHeight: 1 }}>
                    {games.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ letterSpacing: 0.5 }}>
                    Juegos
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    borderRadius: "16px",
                    bgcolor: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                    border: "1px solid",
                    borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h5" fontWeight="900" color="secondary.main" sx={{ lineHeight: 1 }}>
                    {platformCount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ letterSpacing: 0.5 }}>
                    Plataformas
                  </Typography>
                </Paper>
              </Box>
            </Box>

            {/* Quick Interactive Platform Filters */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              mt={3.5}
              pt={2.5}
              borderTop="1px solid"
              borderColor={isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}
              flexWrap="wrap"
            >
              <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ mr: 1, textTransform: "uppercase", letterSpacing: 1 }}>
                Filtrar:
              </Typography>
              {PLATFORM_FILTERS.map((f) => {
                const isActive = activePlatformFilter === f.id;
                return (
                  <Chip
                    key={f.id}
                    label={f.label}
                    onClick={() => setActivePlatformFilter(f.id)}
                    clickable
                    sx={{
                      height: 32,
                      px: 0.8,
                      borderRadius: "10px",
                      fontWeight: isActive ? 800 : 500,
                      fontSize: "0.85rem",
                      bgcolor: isActive
                        ? `${f.color}25`
                        : isDark
                        ? "rgba(255, 255, 255, 0.04)"
                        : "rgba(0, 0, 0, 0.04)",
                      color: isActive ? f.color : "text.secondary",
                      border: "1px solid",
                      borderColor: isActive ? f.color : "transparent",
                      boxShadow: isActive ? `0 0 12px ${f.color}30` : "none",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: `${f.color}20`,
                        color: f.color,
                      },
                    }}
                  />
                );
              })}

              {activePlatformFilter !== "ALL" && (
                <Button
                  size="small"
                  onClick={() => setActivePlatformFilter("ALL")}
                  sx={{ color: "text.secondary", fontSize: "0.75rem", minWidth: "auto", px: 1 }}
                >
                  Limpiar filtro
                </Button>
              )}
            </Box>
          </Paper>

          {/* Games Grid or Empty States */}
          {loading ? (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={12}>
              <CircularProgress size={56} thickness={4} sx={{ color: "primary.main", mb: 2 }} />
              <Typography variant="body2" color="text.secondary" fontWeight="600">
                Sincronizando biblioteca...
              </Typography>
            </Box>
          ) : filteredGames.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 6, md: 10 },
                textAlign: "center",
                borderRadius: "28px",
                bgcolor: isDark ? "rgba(17, 24, 39, 0.5)" : "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(12px)",
                border: "2px dashed",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "24px",
                  bgcolor: isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                  color: "primary.main",
                }}
              >
                <SportsEsportsRoundedIcon sx={{ fontSize: 44 }} />
              </Box>

              <Typography variant="h5" fontWeight="800" sx={{ mb: 1 }}>
                {searchTerm
                  ? `Sin resultados para "${searchTerm}"`
                  : activePlatformFilter !== "ALL"
                  ? `No tienes juegos registrados en ${activePlatformFilter}`
                  : "Tu colección está vacía 🎮"}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 460, mx: "auto", mb: 4 }}>
                {searchTerm
                  ? "Intenta buscar con otro término o revisa la ortografía."
                  : "Agrega tu primer título para comenzar a organizar tu biblioteca y cargar carátulas en alta resolución."}
              </Typography>

              {searchTerm ? (
                <Button
                  variant="outlined"
                  onClick={() => setSearchTerm("")}
                  sx={{ borderRadius: "12px", px: 3, py: 1 }}
                >
                  Limpiar Búsqueda
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setOpenAddDialog(true)}
                  startIcon={<AddRoundedIcon />}
                  sx={{
                    borderRadius: "14px",
                    px: 3.5,
                    py: 1.2,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
                    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                  }}
                >
                  Añadir Mi Primer Juego
                </Button>
              )}
            </Paper>
          ) : (
            <Grid container spacing={{ xs: 2.5, sm: 3, md: 3.5 }}>
              {filteredGames.map((game) => (
                <Grid
                  size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}
                  key={game.id}
                >
                  <GameCard
                    title={game.title}
                    platform={game.platform}
                    onEdit={() => setEditingGame(game)}
                    onDelete={() => handleDeleteGame(game.id)}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Floating Action Button (FAB) */}
          <Tooltip title="Añadir nuevo videojuego" arrow placement="left">
            <Fab
              color="primary"
              onClick={() => setOpenAddDialog(true)}
              sx={{
                position: "fixed",
                bottom: 36,
                right: 36,
                width: 64,
                height: 64,
                background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
                boxShadow: "0 10px 30px rgba(99, 102, 241, 0.5)",
                transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)",
                  boxShadow: "0 15px 35px rgba(99, 102, 241, 0.7)",
                  transform: "scale(1.08) rotate(90deg)",
                },
                zIndex: 1000,
              }}
            >
              <AddRoundedIcon sx={{ fontSize: 32 }} />
            </Fab>
          </Tooltip>

          {/* Dialogs */}
          <AddGameDialog
            open={openAddDialog}
            onClose={() => setOpenAddDialog(false)}
            onAdd={handleAddGame}
          />

          <EditGameDialog
            open={Boolean(editingGame)}
            game={editingGame}
            onClose={() => setEditingGame(null)}
            onSave={handleUpdateGame}
          />

          {/* Notification Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
              severity={snackbar.severity}
              variant="filled"
              sx={{
                borderRadius: "14px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                fontWeight: 600,
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;