import { useState, useMemo, useEffect } from 'react';
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
import { BackupDialog } from './components/games/BackupDialog';
import { GameDetailModal } from './components/games/GameDetailModal';

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
    handleImportGames,
  } = useGames();

  // Local UI filters and dialogs
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openBackupDialog, setOpenBackupDialog] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [deletingGame, setDeletingGame] = useState<Game | null>(null);
  const [viewingGame, setViewingGame] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePlatformFilter, setActivePlatformFilter] = useState('ALL');
  const [activeStatusFilter, setActiveStatusFilter] = useState('ALL');

  // Keep viewingGame in sync with updated game state
  useEffect(() => {
    if (viewingGame) {
      const fresh = games.find((g) => g.id === viewingGame.id);
      if (fresh) {
        setViewingGame(fresh);
      }
    }
  }, [games, viewingGame]);

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
        if (activePlatformFilter === 'STEAM' && !pLower.includes('steam')) {
          return false;
        }
        if (activePlatformFilter === 'EPIC' && !pLower.includes('epic')) {
          return false;
        }
        if (
          activePlatformFilter === 'NINTENDO' &&
          !(
            pLower.includes('switch') ||
            pLower.includes('nintendo') ||
            pLower.includes('ds') ||
            pLower.includes('wii') ||
            pLower.includes('gamecube')
          )
        ) {
          return false;
        }
        if (activePlatformFilter === 'XBOX' && !pLower.includes('xbox')) {
          return false;
        }
        if (
          activePlatformFilter === 'PLAYSTATION' &&
          !(pLower.includes('ps') || pLower.includes('playstation'))
        ) {
          return false;
        }
        if (activePlatformFilter === 'RIOT' && !pLower.includes('riot')) {
          return false;
        }
        if (
          activePlatformFilter === 'BATTLENET' &&
          !(pLower.includes('battle') || pLower.includes('blizzard'))
        ) {
          return false;
        }
        if (
          activePlatformFilter === 'EA' &&
          !(pLower.includes('ea') || pLower.includes('origin'))
        ) {
          return false;
        }
        if (
          activePlatformFilter === 'UBISOFT' &&
          !(pLower.includes('ubisoft') || pLower.includes('uplay'))
        ) {
          return false;
        }
        if (
          activePlatformFilter === 'PC' &&
          !(
            pLower.includes('pc') ||
            pLower.includes('steam') ||
            pLower.includes('epic') ||
            pLower.includes('windows') ||
            pLower.includes('gog')
          )
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

        {/* Ambient Top Glow Lights */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90vw',
            height: '420px',
            background: isDark
              ? 'radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.22) 0%, rgba(6, 182, 212, 0.1) 40%, transparent 75%)'
              : 'radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 75%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Subtle Side Aurora Lights */}
        <Box
          className="aurora-beam"
          sx={{
            position: 'fixed',
            top: '25%',
            left: '-10%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <Box
          className="aurora-beam"
          sx={{
            position: 'fixed',
            bottom: '15%',
            right: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Floating Capsule Navigation Bar */}
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm('')}
          isSyncing={isSyncing}
          onSyncCovers={handleSyncCovers}
          onOpenAddGame={() => setOpenAddDialog(true)}
          onOpenBackup={() => setOpenBackupDialog(true)}
          isDark={isDark}
        />

        {/* Main Content Container */}
        <Container maxWidth="xl" sx={{ mt: 3, mb: 12, position: 'relative', zIndex: 1 }}>
          {/* Gamer Control Deck / Hero */}
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
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={14}>
              <CircularProgress size={52} thickness={4} sx={{ color: 'primary.main', mb: 2 }} />
              <Typography variant="body2" color="text.secondary" fontWeight="700">
                Sincronizando biblioteca de videojuegos...
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
              onViewGame={setViewingGame}
            />
          )}

          {/* Floating Action Button (FAB) */}
          <Tooltip title="Añadir nuevo videojuego (/ o botón)" arrow placement="left">
            <Fab
              color="primary"
              onClick={() => setOpenAddDialog(true)}
              sx={{
                position: 'fixed',
                bottom: 36,
                right: 36,
                width: 62,
                height: 62,
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                boxShadow: '0 12px 32px rgba(99, 102, 241, 0.55)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)',
                  boxShadow: '0 16px 40px rgba(99, 102, 241, 0.75)',
                  transform: 'scale(1.08) rotate(90deg)',
                },
                zIndex: 1000,
              }}
            >
              <AddRoundedIcon sx={{ fontSize: 30 }} />
            </Fab>
          </Tooltip>

          {/* Dialogs & Modals */}
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

          <BackupDialog
            open={openBackupDialog}
            games={games}
            onClose={() => setOpenBackupDialog(false)}
            onImport={handleImportGames}
          />

          {/* Game Detail Showcase Modal */}
          <GameDetailModal
            open={Boolean(viewingGame)}
            game={viewingGame}
            onClose={() => setViewingGame(null)}
            onEdit={(game) => {
              setViewingGame(null);
              setEditingGame(game);
            }}
            onDelete={(game) => {
              setViewingGame(null);
              setDeletingGame(game);
            }}
            onToggleFavorite={handleToggleFavorite}
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
                borderRadius: '16px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
                fontWeight: 700,
                fontSize: '0.9rem',
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