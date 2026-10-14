import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Avatar,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Tooltip,
  Paper,
  Divider,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { useTheme } from '@mui/material/styles';
import {
  SteamProfileSummary,
  SteamOwnedGame,
  SteamImportResult,
} from '../../types/game.types';
import {
  getSteamProfile,
  getSteamOwnedGames,
  importSteamGames,
} from '../../services/game.service';

interface SteamSyncDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SteamSyncDialog: React.FC<SteamSyncDialogProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Step state: 'INPUT' | 'PREVIEW' | 'IMPORTING' | 'SUCCESS'
  const [step, setStep] = useState<'INPUT' | 'PREVIEW' | 'IMPORTING' | 'SUCCESS'>('INPUT');

  // Form inputs
  const [identifier, setIdentifier] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gamedex_steam_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Loaded data
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [profile, setProfile] = useState<SteamProfileSummary | null>(null);
  const [games, setGames] = useState<SteamOwnedGame[]>([]);
  const [selectedAppIds, setSelectedAppIds] = useState<Set<number>>(new Set());
  const [searchFilter, setSearchFilter] = useState('');
  const [updateExistingHours, setUpdateExistingHours] = useState(true);

  // Result
  const [importResult, setImportResult] = useState<SteamImportResult | null>(null);

  const handleReset = () => {
    setStep('INPUT');
    setErrorMessage('');
    setProfile(null);
    setGames([]);
    setSelectedAppIds(new Set());
    setSearchFilter('');
    setImportResult(null);
    setLoading(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSearchAccount = async () => {
    if (!identifier.trim()) {
      setErrorMessage('Por favor introduce tu nombre de usuario, SteamID o enlace de perfil');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Resolver perfil de usuario
      const profileData = await getSteamProfile(identifier, apiKey);
      setProfile(profileData);

      // Guardar apiKey en localStorage si fue ingresada manualmente
      if (apiKey.trim()) {
        localStorage.setItem('gamedex_steam_api_key', apiKey.trim());
      }

      // 2. Obtener lista de juegos
      const ownedData = await getSteamOwnedGames(profileData.steamId, apiKey);

      if (!ownedData.isPublic && ownedData.games.length === 0) {
        setErrorMessage(
          'Tu cuenta fue encontrada, pero la lista de juegos está en privado. ' +
          'En Steam ve a: Tu Perfil > Modificar Perfil > Configuración de Privacidad > ' +
          'y cambia "Detalles de los juegos" a "Público".',
        );
        setGames([]);
        setStep('INPUT');
        return;
      }

      if (ownedData.games.length === 0) {
        setErrorMessage('No se encontraron videojuegos en esta cuenta de Steam.');
        setGames([]);
        setStep('INPUT');
        return;
      }

      setGames(ownedData.games);
      // Seleccionar todos por defecto
      setSelectedAppIds(new Set(ownedData.games.map((g) => g.appId)));
      setStep('PREVIEW');
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Error al conectar con Steam. Verifica tu identificador o clave de API.';
      setErrorMessage(msg);
      // Si el error menciona la API key, mostramos el campo
      if (msg.toLowerCase().includes('api key') || msg.toLowerCase().includes('clave')) {
        setShowApiKeyInput(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSelectAll = () => {
    if (selectedAppIds.size === games.length) {
      setSelectedAppIds(new Set());
    } else {
      setSelectedAppIds(new Set(games.map((g) => g.appId)));
    }
  };

  const handleToggleGame = (appId: number) => {
    setSelectedAppIds((prev) => {
      const next = new Set(prev);
      if (next.has(appId)) {
        next.delete(appId);
      } else {
        next.add(appId);
      }
      return next;
    });
  };

  const handleExecuteImport = async () => {
    const selectedGames = games.filter((g) => selectedAppIds.has(g.appId));
    if (selectedGames.length === 0) {
      setErrorMessage('Selecciona al menos un juego para importar.');
      return;
    }

    setStep('IMPORTING');
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await importSteamGames(
        selectedGames.map((g) => ({
          title: g.title,
          appId: g.appId,
          coverUrl: g.coverUrl,
          hoursPlayed: g.hoursPlayed,
          status: g.suggestedStatus,
        })),
        updateExistingHours,
      );

      setImportResult(result);
      setStep('SUCCESS');
      onSuccess();
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || 'Error al guardar los juegos en la base de datos.',
      );
      setStep('PREVIEW');
    } finally {
      setLoading(false);
    }
  };

  // Filtrado en vista previa
  const filteredPreviewGames = games.filter((g) =>
    g.title.toLowerCase().includes(searchFilter.toLowerCase().trim()),
  );

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: '20px',
          bgcolor: isDark ? '#171b26' : '#ffffff',
          color: 'text.primary',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: isDark
            ? '0 24px 48px -12px rgba(0, 0, 0, 0.7)'
            : '0 24px 48px -12px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          pt: 2.5,
          pb: 1.5,
          borderBottom: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '11px',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#c8d3df' : '#ffffff',
            }}
          >
            <SportsEsportsRoundedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="700" sx={{ lineHeight: 1.2, fontSize: '1.1rem' }}>
              Sincronizar Biblioteca de Steam
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Importa tus videojuegos, carátulas y horas de juego oficiales
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={handleClose}
          disabled={loading}
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Error Alert */}
        {errorMessage && (
          <Alert
            severity="error"
            onClose={() => setErrorMessage('')}
            sx={{
              borderRadius: '12px',
              bgcolor: isDark ? 'rgba(239, 68, 68, 0.12)' : undefined,
              color: isDark ? '#fca5a5' : undefined,
              border: isDark ? '1px solid rgba(239, 68, 68, 0.25)' : undefined,
            }}
          >
            {errorMessage}
          </Alert>
        )}

        {/* STEP 1: INPUT IDENTIFIER */}
        {step === 'INPUT' && (
          <Box display="flex" flexDirection="column" gap={2.5}>
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: 'text.primary' }}>
                Usuario o Perfil de Steam
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchAccount();
                }}
                placeholder="Ej. gaben, o https://steamcommunity.com/id/tu_usuario"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    bgcolor: isDark ? '#141721' : '#f8fafc',
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.6, display: 'block' }}>
                Puedes escribir tu nombre de usuario personalizado, tu SteamID64 o pegar el enlace completo a tu perfil de Steam.
              </Typography>
            </Box>

            {/* Optional Steam API Key Section */}
            <Box
              sx={{
                p: 2,
                borderRadius: '14px',
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <KeyRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" fontWeight="600">
                    Steam Web API Key
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => setShowApiKeyInput((prev) => !prev)}
                  sx={{ fontSize: '0.75rem', textTransform: 'none', py: 0.2 }}
                >
                  {showApiKeyInput ? 'Ocultar' : 'Configurar clave'}
                </Button>
              </Box>

              {showApiKeyInput && (
                <Box sx={{ mt: 1.5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Pega aquí tu Steam API Key"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        bgcolor: isDark ? '#141721' : '#f8fafc',
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.8, display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    Si ya la colocaste en el archivo <code>server-gamedex/.env</code>, no necesitas escribirla aquí.
                    <a
                      href="https://steamcommunity.com/dev/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: isDark ? '#93c5fd' : '#2563eb',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 2,
                        textDecoration: 'none',
                        fontWeight: 600,
                        marginLeft: 4,
                      }}
                    >
                      Obtener clave gratis <OpenInNewRoundedIcon sx={{ fontSize: 12 }} />
                    </a>
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Privacy Reminder Card */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '14px',
                bgcolor: isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.05)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)',
              }}
            >
              <Typography variant="body2" fontWeight="700" sx={{ color: isDark ? '#93c5fd' : '#1d4ed8', mb: 0.5 }}>
                Importante para poder leer tu biblioteca:
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? '#c8d3df' : '#334155', lineHeight: 1.5, display: 'block' }}>
                En la configuración de privacidad de tu perfil de Steam, la opción <strong>"Detalles de los juegos"</strong> debe estar configurada en <strong>"Público"</strong> para que Valve permita descargar tu catálogo.
              </Typography>
            </Paper>
          </Box>
        )}

        {/* STEP 2: PREVIEW & SELECT */}
        {step === 'PREVIEW' && profile && (
          <Box display="flex" flexDirection="column" gap={2}>
            {/* User Profile Banner */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '14px',
                bgcolor: isDark ? '#141721' : '#f8fafc',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box display="flex" alignItems="center" gap={1.8}>
                <Avatar
                  src={profile.avatar}
                  alt={profile.personaName}
                  sx={{ width: 48, height: 48, borderRadius: '12px' }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="700" sx={{ lineHeight: 1.2 }}>
                    {profile.personaName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    SteamID: {profile.steamId} • {games.length} juegos en biblioteca
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleReset}
                  sx={{
                    borderRadius: '9px',
                    fontSize: '0.75rem',
                    textTransform: 'none',
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                    color: 'text.secondary',
                  }}
                >
                  Cambiar cuenta
                </Button>
              </Box>
            </Paper>

            {/* Filter & Selection Controls */}
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} flexWrap="wrap">
              <TextField
                size="small"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Buscar juego..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: '100%', sm: 260 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    bgcolor: isDark ? '#141721' : '#f8fafc',
                  },
                }}
              />

              <Box display="flex" alignItems="center" gap={1}>
                <Button
                  size="small"
                  onClick={handleToggleSelectAll}
                  sx={{ fontSize: '0.78rem', textTransform: 'none' }}
                >
                  {selectedAppIds.size === games.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
                </Button>
                <Typography variant="caption" color="text.secondary" fontWeight="600">
                  ({selectedAppIds.size} de {games.length} seleccionados)
                </Typography>
              </Box>
            </Box>

            {/* Games List (Scrollable) */}
            <Box
              sx={{
                maxHeight: 340,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                pr: 0.5,
              }}
            >
              {filteredPreviewGames.map((game) => {
                const isSelected = selectedAppIds.has(game.appId);
                return (
                  <Paper
                    key={game.appId}
                    elevation={0}
                    onClick={() => handleToggleGame(game.appId)}
                    sx={{
                      p: 1.2,
                      px: 1.6,
                      borderRadius: '12px',
                      bgcolor: isSelected
                        ? isDark
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(15, 23, 42, 0.04)'
                        : isDark
                        ? '#141721'
                        : '#f8fafc',
                      border: '1px solid',
                      borderColor: isSelected
                        ? isDark
                          ? 'rgba(255, 255, 255, 0.18)'
                          : 'rgba(0, 0, 0, 0.18)'
                        : isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : 'rgba(0, 0, 0, 0.04)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1.4} sx={{ minWidth: 0, flexGrow: 1 }}>
                      <Checkbox
                        size="small"
                        checked={isSelected}
                        onChange={() => handleToggleGame(game.appId)}
                        onClick={(e) => e.stopPropagation()}
                        sx={{ p: 0.4 }}
                      />

                      {/* Cover Thumbnail */}
                      <Box
                        component="img"
                        src={game.headerUrl || game.coverUrl}
                        alt={game.title}
                        sx={{
                          width: 54,
                          height: 28,
                          objectFit: 'cover',
                          borderRadius: '6px',
                          bgcolor: isDark ? '#0f172a' : '#e2e8f0',
                        }}
                      />

                      <Typography
                        variant="body2"
                        fontWeight="600"
                        noWrap
                        sx={{
                          color: isSelected ? 'text.primary' : 'text.secondary',
                          fontSize: '0.88rem',
                        }}
                      >
                        {game.title}
                      </Typography>
                    </Box>

                    {/* Hours Played Tag */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.4,
                        px: 1,
                        py: 0.3,
                        borderRadius: '6px',
                        bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                        flexShrink: 0,
                      }}
                    >
                      <AccessTimeRoundedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                      <Typography variant="caption" fontWeight="700" color="text.secondary">
                        {game.hoursPlayed > 0 ? `${game.hoursPlayed}h` : '0h'}
                      </Typography>
                    </Box>
                  </Paper>
                );
              })}

              {filteredPreviewGames.length === 0 && (
                <Box textAlign="center" py={4}>
                  <Typography variant="body2" color="text.secondary">
                    No se encontraron juegos que coincidan con "{searchFilter}"
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Overwrite hours toggle */}
            <Divider sx={{ my: 0.5, borderColor: isDark ? 'rgba(255,255,255,0.06)' : undefined }} />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={updateExistingHours}
                  onChange={(e) => setUpdateExistingHours(e.target.checked)}
                />
              }
              label={
                <Typography variant="caption" color="text.secondary">
                  Actualizar horas de juego si el título ya existe en mi biblioteca de GameDex
                </Typography>
              }
            />
          </Box>
        )}

        {/* STEP 3: IMPORTING LOADER */}
        {step === 'IMPORTING' && (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6} gap={2}>
            <CircularProgress size={48} thickness={4} sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" fontWeight="700">
              Importando juegos a tu biblioteca...
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Guardando títulos, horas jugadas y carátulas HD en la base de datos de GameDex
            </Typography>
          </Box>
        )}

        {/* STEP 4: SUCCESS SUMMARY */}
        {step === 'SUCCESS' && importResult && (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={4} gap={2}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.12)',
                color: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircleRoundedIcon sx={{ fontSize: 36 }} />
            </Box>

            <Typography variant="h6" fontWeight="700" textAlign="center">
              ¡Sincronización Completada!
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                borderRadius: '14px',
                bgcolor: isDark ? '#141721' : '#f8fafc',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                width: '100%',
                justifyContent: 'space-around',
                textAlign: 'center',
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="800" sx={{ color: '#22c55e' }}>
                  {importResult.imported}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Nuevos importados
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : undefined }} />
              <Box>
                <Typography variant="h5" fontWeight="800" sx={{ color: '#38bdf8' }}>
                  {importResult.updated}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Horas actualizadas
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : undefined }} />
              <Box>
                <Typography variant="h5" fontWeight="800" color="text.secondary">
                  {importResult.skipped}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Ya existían
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {step === 'INPUT' && (
          <>
            <Button
              variant="text"
              onClick={handleClose}
              disabled={loading}
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSearchAccount}
              disabled={loading || !identifier.trim()}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SearchRoundedIcon />}
              sx={{
                bgcolor: isDark ? '#232734' : '#0f172a',
                color: '#f8fafc',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                borderRadius: '10px',
                px: 2.5,
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: isDark ? '#2f3445' : '#1e293b',
                },
              }}
            >
              {loading ? 'Consultando Steam...' : 'Buscar Cuenta'}
            </Button>
          </>
        )}

        {step === 'PREVIEW' && (
          <>
            <Button
              variant="text"
              onClick={handleReset}
              disabled={loading}
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              onClick={handleExecuteImport}
              disabled={loading || selectedAppIds.size === 0}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <CheckCircleRoundedIcon />}
              sx={{
                bgcolor: isDark ? '#232734' : '#0f172a',
                color: '#f8fafc',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                borderRadius: '10px',
                px: 2.5,
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: isDark ? '#2f3445' : '#1e293b',
                },
              }}
            >
              Importar {selectedAppIds.size} Juegos
            </Button>
          </>
        )}

        {step === 'SUCCESS' && (
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                bgcolor: isDark ? '#232734' : '#0f172a',
                color: '#f8fafc',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                borderRadius: '10px',
                px: 3,
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: isDark ? '#2f3445' : '#1e293b',
                },
              }}
            >
              Cerrar y Ver Biblioteca
            </Button>
          </Box>
        )}
      </DialogActions>
    </Dialog>
  );
};
