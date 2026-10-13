import { useState, useMemo } from 'react';
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Fab,
  ThemeProvider,
  CssBaseline,
  Snackbar,
  Alert,
  Tooltip,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { Navbar } from './components/layout/Navbar';
import { HeroStats } from './components/games/HeroStats';
import { GameGrid } from './components/games/GameGrid';
import { EmptyState } from './components/games/EmptyState';
import AddGameDialog from './components/games/AddGameDialog';
import EditGameDialog from './components/games/EditGameDialog';
import { DeleteGameDialog } from './components/games/DeleteGameDialog';

import { ThemeContext } from './theme/ThemeContext';
import { useColorMode } from './theme/useColorMode';
import { useGames } from './hooks/useGames';
import { Game } from './types/game.types';

function App() {
  const { isDark, toggleColorMode, theme } = useColorMode();
  const themeContextValue = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);

  const {
    games,
    loading,
    isSyncing,
    snackbar,
    stats,
    closeSnackbar,
    handleAddGame,
    handleUpdateGame,
    handleDeleteGame,
    handleToggleFavorite,
    handleSyncCovers,
  } = useGames();

  // Local UI filters and dialogs
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [deletingGame, setDeletingGame] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePlatformFilter, setActivePlatformFilter] = useState('ALL');
  const [activeStatusFilter, setActiveStatusFilter] = useState('ALL');

  // Filter games based on search, status, and platform
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.platform.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Status / Favorite filter
      if (activeStatusFilter === 'FAVORITES') {
        if (!game.isFavorite) return false;
      } else if (activeStatusFilter !== 'ALL') {
        if (game.status !== activeStatusFilter) return false;
      }

      // Platform filter
      if (activePlatformFilter !== 'ALL') {
        const pLower = game.platform.toLowerCase();
        if (
          activePlatformFilter === 'PC' &&
          !(pLower.includes('pc') || pLower.includes('steam') || pLower.includes('windows'))
        ) {
          return false;
        }
        if (
          activePlatformFilter === 'PLAYSTATION' &&
          !(pLower.includes('ps') || pLower.includes('playstation'))
        ) {
          return false;
        }
        if (activePlatformFilter === 'XBOX' && !pLower.includes('xbox')) {
          return false;
        }
        if (
          activePlatformFilter === 'NINTENDO' &&
          !(pLower.includes('switch') || pLower.includes('nintendo'))
        ) {
          return false;
        }
      }

      return true;
    });
  }, [games, searchTerm, activePlatformFilter, activeStatusFilter]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Ambient Top Glow Light */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            height: '350px',
            background: isDark
              ? 'radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.18) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 75%)'
              : 'radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.08) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 75%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Floating Glassmorphic Navigation Bar */}
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm('')}
          isSyncing={isSyncing}
          onSyncCovers={handleSyncCovers}
          onOpenAddGame={() => setOpenAddDialog(true)}
          isDark={isDark}
        />

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 12, position: 'relative', zIndex: 1 }}>
          {/* Hero Banner with Stats and Filters */}
          <HeroStats
            stats={stats}
            searchTerm={searchTerm}
            activeStatusFilter={activeStatusFilter}
            activePlatformFilter={activePlatformFilter}
            onSelectStatusFilter={setActiveStatusFilter}
            onSelectPlatformFilter={setActivePlatformFilter}
            isDark={isDark}
          />

          {/* Games Grid or Empty States */}
          {loading ? (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={12}>
              <CircularProgress size={56} thickness={4} sx={{ color: 'primary.main', mb: 2 }} />
              <Typography variant="body2" color="text.secondary" fontWeight="600">
                Sincronizando biblioteca...
              </Typography>
            </Box>
          ) : filteredGames.length === 0 ? (
            <EmptyState
              searchTerm={searchTerm}
              activeStatusFilter={activeStatusFilter}
              activePlatformFilter={activePlatformFilter}
              onClearSearch={() => setSearchTerm('')}
              onOpenAddGame={() => setOpenAddDialog(true)}
              isDark={isDark}
            />
          ) : (
            <GameGrid
              games={filteredGames}
              onEdit={setEditingGame}
              onDelete={setDeletingGame}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {/* Floating Action Button (FAB) */}
          <Tooltip title="Añadir nuevo videojuego" arrow placement="left">
            <Fab
              color="primary"
              onClick={() => setOpenAddDialog(true)}
              sx={{
                position: 'fixed',
                bottom: 36,
                right: 36,
                width: 64,
                height: 64,
                background: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)',
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.5)',
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)',
                  boxShadow: '0 15px 35px rgba(99, 102, 241, 0.7)',
                  transform: 'scale(1.08) rotate(90deg)',
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

          <DeleteGameDialog
            open={Boolean(deletingGame)}
            game={deletingGame}
            onClose={() => setDeletingGame(null)}
            onConfirm={handleDeleteGame}
          />

          {/* Notification Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={closeSnackbar}
              severity={snackbar.severity}
              variant="filled"
              sx={{
                borderRadius: '14px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
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