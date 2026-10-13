import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  getGames,
  createGame,
  updateGame,
  deleteGame,
  syncMissingCovers,
  toggleFavorite,
  importGames,
} from '../services/game.service';
import { Game, CreateGameData, UpdateGameData, GameStats } from '../types/game.types';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const showSnackbar = useCallback((message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const loadGames = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getGames();
      setGames(data);
    } catch (error) {
      showSnackbar('Error al conectar con la API de GameDex', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const handleAddGame = async (data: CreateGameData) => {
    try {
      await createGame(data);
      showSnackbar(`"${data.title}" añadido a tu colección`, 'success');
      await loadGames();
    } catch (error) {
      showSnackbar('Error al crear el videojuego', 'error');
    }
  };

  const handleUpdateGame = async (id: number, data: UpdateGameData) => {
    try {
      await updateGame(id, data);
      showSnackbar(`"${data.title || 'Juego'}" actualizado correctamente`, 'success');
      await loadGames();
    } catch (error) {
      showSnackbar('Error al actualizar el juego', 'error');
    }
  };

  const handleToggleFavorite = async (id: number, current: boolean) => {
    try {
      await toggleFavorite(id, current);
      showSnackbar(
        current ? 'Eliminado de favoritos' : '⭐ Marcado como favorito',
        'success',
      );
      await loadGames();
    } catch (error) {
      showSnackbar('Error al actualizar favorito', 'error');
    }
  };

  const handleSyncCovers = async () => {
    try {
      setIsSyncing(true);
      showSnackbar('Sincronizando carátulas multitienda...', 'success');
      const res = await syncMissingCovers();
      showSnackbar(
        res.updated > 0
          ? `${res.updated} carátulas sincronizadas y guardadas con éxito`
          : 'Todas las carátulas ya están sincronizadas',
        'success',
      );
      await loadGames();
    } catch (error) {
      showSnackbar('Error al sincronizar carátulas con el servidor', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteGame = async (id: number) => {
    try {
      await deleteGame(id);
      showSnackbar('Juego eliminado de la colección', 'success');
      await loadGames();
    } catch (error) {
      showSnackbar('Error al eliminar el juego', 'error');
    }
  };

  const handleImportGames = async (items: CreateGameData[]) => {
    try {
      setLoading(true);
      const res = await importGames(items);
      showSnackbar(`${res.count} videojuegos importados exitosamente`, 'success');
      await loadGames();
      return res;
    } catch (error) {
      showSnackbar('Error al importar videojuegos a la colección', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const stats: GameStats = useMemo(() => {
    return {
      total: games.length,
      playing: games.filter((g) => g.status === 'PLAYING').length,
      completed: games.filter((g) => g.status === 'COMPLETED').length,
      backlog: games.filter((g) => g.status === 'BACKLOG').length,
      favorites: games.filter((g) => g.isFavorite).length,
      platforms: new Set(games.map((g) => g.platform.trim().toLowerCase())).size,
    };
  }, [games]);

  return {
    games,
    loading,
    isSyncing,
    snackbar,
    stats,
    showSnackbar,
    closeSnackbar,
    loadGames,
    handleAddGame,
    handleUpdateGame,
    handleDeleteGame,
    handleToggleFavorite,
    handleSyncCovers,
    handleImportGames,
  };
};
