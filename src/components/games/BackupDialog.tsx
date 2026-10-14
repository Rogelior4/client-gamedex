import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  Fade,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import CloudSyncRoundedIcon from '@mui/icons-material/CloudSyncRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import { useTheme } from '@mui/material/styles';
import { Game, CreateGameData } from '../../types/game.types';
import { exportCollectionJSON, exportCollectionCSV } from '../../services/game.service';

interface BackupDialogProps {
  open: boolean;
  games: Game[];
  onClose: () => void;
  onImport: (games: CreateGameData[]) => Promise<any>;
}

export const BackupDialog: React.FC<BackupDialogProps> = ({
  open,
  games,
  onClose,
  onImport,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [activeTab, setActiveTab] = useState<number>(0);
  const [fileToImport, setFileToImport] = useState<File | null>(null);
  const [parsedGames, setParsedGames] = useState<CreateGameData[]>([]);
  const [importError, setImportError] = useState<string>('');
  const [isImporting, setIsImporting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setImportError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileToImport(file);
    setImportError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          const json = JSON.parse(content);
          const rawList = Array.isArray(json) ? json : json.games;

          if (!Array.isArray(rawList)) {
            throw new Error('El archivo JSON no contiene un arreglo de juegos válido.');
          }

          const validGames: CreateGameData[] = rawList
            .filter((item: any) => item && typeof item.title === 'string' && item.title.trim().length > 0)
            .map((item: any) => ({
              title: item.title.trim(),
              platform: (item.platform || 'PC').trim(),
              coverUrl: item.coverUrl || null,
              status: item.status || 'BACKLOG',
              rating: typeof item.rating === 'number' ? item.rating : null,
              isFavorite: Boolean(item.isFavorite),
              hoursPlayed: typeof item.hoursPlayed === 'number' ? item.hoursPlayed : 0,
              notes: item.notes || null,
            }));

          if (validGames.length === 0) {
            throw new Error('No se encontraron videojuegos válidos en el archivo JSON.');
          }

          setParsedGames(validGames);
        } else {
          throw new Error('Por favor selecciona un archivo con extensión .json.');
        }
      } catch (err: any) {
        setImportError(err.message || 'Error al procesar el archivo seleccionado.');
        setParsedGames([]);
      }
    };

    reader.readAsText(file);
  };

  const handleExecuteImport = async () => {
    if (parsedGames.length === 0) return;

    try {
      setIsImporting(true);
      setImportError('');
      await onImport(parsedGames);
      // Reset
      setParsedGames([]);
      setFileToImport(null);
      onClose();
    } catch (err: any) {
      setImportError('Error al importar videojuegos con el servidor.');
    } finally {
      setIsImporting(false);
    }
  };

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
          borderRadius: '24px',
          bgcolor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.15)',
          boxShadow: isDark
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.2)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1, pt: 2 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '10px',
            bgcolor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#0f172a',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDark ? '#f4f4f5' : '#ffffff',
          }}
        >
          <CloudSyncRoundedIcon sx={{ fontSize: 22 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="800" sx={{ lineHeight: 1.2 }}>
            Copia de Seguridad y Restauración
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Exporta tu catálogo a archivos externos o restaura tu biblioteca
          </Typography>
        </Box>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', px: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            minHeight: 44,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              minHeight: 44,
            },
          }}
        >
          <Tab icon={<FileDownloadRoundedIcon />} iconPosition="start" label="Exportar Biblioteca" />
          <Tab icon={<FileUploadRoundedIcon />} iconPosition="start" label="Importar / Restaurar" />
        </Tabs>
      </Box>

      <DialogContent sx={{ pt: '20px !important', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {activeTab === 0 ? (
          /* TAB 0: EXPORTAR */
          <Box display="flex" flexDirection="column" gap={2}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: '16px',
                bgcolor: isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.05)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.15)',
              }}
            >
              <Typography variant="subtitle2" fontWeight="800" sx={{ mb: 0.5, color: 'primary.main' }}>
                📦 Resumen de la Colección
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tu biblioteca contiene actualmente <strong>{games.length} videojuegos</strong> registrados. Al exportar, se respaldan todos los datos: títulos, plataformas, carátulas, estados, calificaciones, favoritos y notas personales.
              </Typography>
            </Box>

            <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => exportCollectionJSON(games)}
                disabled={games.length === 0}
                startIcon={<DataObjectRoundedIcon />}
                sx={{
                  py: 1.3,
                  borderRadius: '10px',
                  fontWeight: 700,
                  bgcolor: isDark ? '#232734' : '#0f172a',
                  color: '#f8fafc',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  boxShadow: 'none',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: isDark ? '#2f3445' : '#1e293b',
                  },
                }}
              >
                Descargar Respaldo JSON
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => exportCollectionCSV(games)}
                disabled={games.length === 0}
                startIcon={<TableChartRoundedIcon />}
                sx={{
                  py: 1.5,
                  borderRadius: '14px',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderWidth: '1.5px',
                }}
              >
                Exportar Hoja CSV (Excel)
              </Button>
            </Box>
          </Box>
        ) : (
          /* TAB 1: IMPORTAR */
          <Box display="flex" flexDirection="column" gap={2}>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '2px dashed',
                borderColor: parsedGames.length > 0 ? '#22c55e' : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                bgcolor: parsedGames.length > 0 ? (isDark ? 'rgba(34, 197, 94, 0.08)' : 'rgba(34, 197, 94, 0.05)') : isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.04)',
                },
              }}
            >
              <FileUploadRoundedIcon sx={{ fontSize: 40, color: parsedGames.length > 0 ? '#22c55e' : 'primary.main', mb: 1 }} />
              <Typography variant="subtitle2" fontWeight="800">
                {fileToImport ? fileToImport.name : 'Haz clic aquí para seleccionar tu archivo de respaldo (.json)'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {parsedGames.length > 0
                  ? `✅ Se detectaron ${parsedGames.length} videojuegos listos para ser importados.`
                  : 'Soporta archivos de respaldo generados por GameDex'}
              </Typography>
            </Box>

            {importError && (
              <Alert severity="error" sx={{ borderRadius: '12px' }}>
                {importError}
              </Alert>
            )}

            {parsedGames.length > 0 && (
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ display: 'block', mb: 0.8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Vista previa de títulos detectados ({parsedGames.length}):
                </Typography>
                <Box
                  sx={{
                    maxHeight: 160,
                    overflowY: 'auto',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    bgcolor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
                  }}
                >
                  <List dense disablePadding>
                    {parsedGames.map((g, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <SportsEsportsRoundedIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <ListItemText
                          primary={g.title}
                          secondary={`${g.platform} • ${g.status || 'BACKLOG'}`}
                          primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 700 }}
                          secondaryTypographyProps={{ fontSize: '0.72rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: '12px',
            px: 2.5,
            color: 'text.secondary',
            fontWeight: '600',
            textTransform: 'none',
          }}
        >
          Cerrar
        </Button>

        {activeTab === 1 && (
          <Button
            onClick={handleExecuteImport}
            variant="contained"
            disabled={parsedGames.length === 0 || isImporting}
            startIcon={isImporting ? <CircularProgress size={18} color="inherit" /> : <CheckCircleRoundedIcon />}
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1,
              fontWeight: '700',
              textTransform: 'none',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                boxShadow: '0 6px 20px rgba(34, 197, 94, 0.6)',
              },
            }}
          >
            {isImporting ? 'Importando...' : `Importar ${parsedGames.length} Juegos`}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
