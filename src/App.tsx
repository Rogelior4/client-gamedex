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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

import GameCard from "./components/GameCard";
import AddGameDialog from "./components/AddGameDialog";
import {
  getGames,
  createGame,
  deleteGame,
  Game,
} from "./services/game.service";
import { appTheme } from "./theme/theme";

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
      showSnackbar("Error al cargar los juegos", "error");
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
      showSnackbar("Juego añadido correctamente", "success");
      loadGames();
    } catch (error) {
      showSnackbar("Error al crear el juego", "error");
    }
  };

  const handleDeleteGame = async (id: string) => {
    try {
      await deleteGame(id);
      showSnackbar("Juego eliminado", "success");
      loadGames();
    } catch (error) {
      showSnackbar("Error al eliminar el juego", "error");
    }
  };

  const filteredGames = useMemo(() => {
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.platform.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [games, searchTerm]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />

      <AppBar
        position="static"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Toolbar sx={{ height: 80 }}>
          {searchOpen ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TextField
                autoFocus
                fullWidth
                variant="standard"
                placeholder="Buscar juego..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  style: { fontSize: "1.5rem", color: "white" },
                }}
              />
              <IconButton
                onClick={() => {
                  setSearchOpen(false);
                  setSearchTerm("");
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 900,
                  color: "text.primary",
                  letterSpacing: "-1px",
                }}
              >
                Gamedex
              </Typography>
              <IconButton
                onClick={() => setSearchOpen(true)}
                sx={{ color: "text.secondary", transform: "scale(1.2)" }}
              >
                <SearchIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 5, mb: 10 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 5,
                borderRadius: 4,
                background: "linear-gradient(45deg, #1e1e1e 30%, #252525 90%)",
                border: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="800"
                  color="text.primary"
                  sx={{ mb: 1 }}
                >
                  {searchTerm ? "Resultados" : "Tu Colección"}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  fontWeight="400"
                >
                  Gestiona y organiza tus videojuegos favoritos.
                </Typography>
              </Box>

              {!searchTerm && (
                <Chip
                  icon={<VideogameAssetIcon />}
                  label={`${games.length} Juegos`}
                  sx={{
                    height: 40,
                    px: 1,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    bgcolor: "rgba(187, 134, 252, 0.1)",
                    color: "primary.main",
                    border: "1px solid rgba(187, 134, 252, 0.3)",
                  }}
                />
              )}
            </Paper>

            <Grid container spacing={2}>
              {filteredGames.length === 0 ? (
                <Grid size={{ xs: 12 }}>
                  <Paper
                    sx={{
                      p: 10,
                      textAlign: "center",
                      borderRadius: 4,
                      bgcolor: "background.paper",
                      border: "2px dashed #444",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="text.secondary"
                      fontWeight="bold"
                    >
                      {searchTerm
                        ? "No encontré nada 🔍"
                        : "Está muy vacío aquí... 🕸️"}
                    </Typography>
                  </Paper>
                </Grid>
              ) : (
                filteredGames.map((game) => (
                  <Grid
                    size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 2 }}
                    key={game.id}
                  >
                    <GameCard
                      title={game.title}
                      platform={game.platform}
                      onDelete={() => handleDeleteGame(game.id)}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </>
        )}

        <Fab
          color="primary"
          onClick={() => setOpenDialog(true)}
          sx={{
            position: "fixed",
            bottom: 40,
            right: 40,
            width: 72,
            height: 72,
          }}
        >
          <AddIcon sx={{ fontSize: 36 }} />
        </Fab>

        <AddGameDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onAdd={handleAddGame}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
