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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#1565c0' : '#90caf9',
          },
          background: {
            default: mode === 'light' ? '#f0f2f5' : '#0f172a',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
          },
          text: {
            primary: mode === 'light' ? '#1c2434' : '#f8fafc',
            secondary: mode === 'light' ? '#64748b' : '#94a3b8',
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' ? 'none' : undefined,
              }
            }
          }
        }
      }),
    [mode],
  );

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
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
      showSnackbar("Error loading games", "error");
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
      showSnackbar("Game added successfully", "success");
      loadGames();
    } catch (error) {
      showSnackbar("Error creating game", "error");
    }
  };

  const handleUpdateGame = async (
    id: number,
    title: string,
    platform: string,
  ) => {
    try {
      await updateGame(id, { title, platform });
      showSnackbar("Game updated successfully", "success");
      loadGames();
    } catch (error) {
      showSnackbar("Error updating game", "error");
    }
  };

  const handleDeleteGame = async (id: number) => {
    try {
      await deleteGame(id);
      showSnackbar("Game deleted", "success");
      loadGames();
    } catch (error) {
      showSnackbar("Error deleting game", "error");
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
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar
          position="static"
          elevation={0} 
          sx={{ 
            bgcolor: '#1e293b', 
            color: 'white'
          }}
        >
          <Toolbar sx={{ height: 80 }}>
            {searchOpen ? (
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  bgcolor: 'background.paper',
                  p: 1,
                  borderRadius: 2,
                  color: 'text.primary'
                }}
              >
                <TextField
                  autoFocus
                  fullWidth
                  variant="standard"
                  placeholder="Search game..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: "1.2rem" },
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
                    fontWeight: 800,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Gamedex
                </Typography>

                <ThemeToggle />

                <IconButton
                  onClick={() => setSearchOpen(true)}
                  sx={{ color: "inherit", transform: "scale(1.1)", ml: 1 }}
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
                elevation={mode === 'light' ? 1 : 0}
                sx={{
                  p: 4,
                  mb: 5,
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  border: mode === 'dark' ? "1px solid rgba(255,255,255,0.1)" : "none",
                  display: "flex",
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: "center",
                  justifyContent: 'space-between',
                  gap: 3,
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    fontWeight="800"
                    color="text.primary"
                    sx={{ mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}
                  >
                    {searchTerm ? "Results" : "Your Collection"}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontWeight="400"
                  >
                    Manage and organize your favorite video games.
                  </Typography>
                </Box>

                {!searchTerm && (
                  <Chip
                    icon={<VideogameAssetIcon />}
                    label={`${games.length} Games`}
                    sx={{
                      height: 48,
                      px: 2,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      borderRadius: 2,
                      bgcolor: mode === 'light' ? 'rgba(21, 101, 192, 0.08)' : 'rgba(144, 202, 249, 0.16)',
                      color: 'primary.main',
                      border: 'none', 
                    }}
                  />
                )}
              </Paper>

              <Grid container spacing={3}>
                {filteredGames.length === 0 ? (
                  <Grid size={{ xs: 12 }}>
                    <Paper
                      sx={{
                        p: 10,
                        textAlign: "center",
                        borderRadius: 4,
                        bgcolor: "background.paper",
                        border: "2px dashed",
                        borderColor: "divider"
                      }}
                    >
                      <Typography
                        variant="h5"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        {searchTerm
                          ? "No results found 🔍"
                          : "It's empty here... 🕸️"}
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
                        onEdit={() => setEditingGame(game)}
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
              boxShadow: 4
            }}
          >
            <AddIcon sx={{ fontSize: 36 }} />
          </Fab>

          <AddGameDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onAdd={handleAddGame}
          />

          <EditGameDialog
            open={Boolean(editingGame)}
            game={editingGame}
            onClose={() => setEditingGame(null)}
            onSave={handleUpdateGame}
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
    </ThemeContext.Provider>
  );
}

export default App;