import { FilterOption } from '../types/game.types';

export const STATUS_FILTERS: FilterOption[] = [
  { id: 'ALL', label: 'Todos', color: '#6366f1' },
  { id: 'FAVORITES', label: '⭐ Favoritos', color: '#f59e0b' },
  { id: 'PLAYING', label: 'Jugando', color: '#22c55e' },
  { id: 'COMPLETED', label: 'Completados', color: '#eab308' },
  { id: 'BACKLOG', label: 'Pendientes', color: '#818cf8' },
  { id: 'WISHLIST', label: 'Deseados', color: '#ec4899' },
];

export const PLATFORM_FILTERS: FilterOption[] = [
  { id: 'ALL', label: 'Todas', color: '#6366f1' },
  { id: 'STEAM', label: 'Steam', color: '#38bdf8' },
  { id: 'EPIC', label: 'Epic Games', color: '#a855f7' },
  { id: 'NINTENDO', label: 'Nintendo', color: '#fb7185' },
  { id: 'XBOX', label: 'Xbox', color: '#4ade80' },
  { id: 'PLAYSTATION', label: 'PlayStation', color: '#818cf8' },
  { id: 'RIOT', label: 'Riot Games', color: '#f43f5e' },
  { id: 'BATTLENET', label: 'Battle.net', color: '#0ea5e9' },
  { id: 'EA', label: 'EA App', color: '#fb923c' },
  { id: 'UBISOFT', label: 'Ubisoft', color: '#a78bfa' },
  { id: 'PC', label: 'PC', color: '#64748b' },
];

export const PLATFORM_PRESETS: string[] = [
  'Steam',
  'Epic Games',
  'Nintendo Switch',
  'Xbox',
  'PlayStation 5',
  'Riot Games',
  'Battle.net',
  'EA App',
  'Ubisoft Connect',
  'PC',
  'GOG Galaxy',
  'Steam Deck',
];

export const STORE_SEARCH_PROVIDERS = [
  { id: 'all', label: 'Todas las Tiendas', color: '#6366f1' },
  { id: 'steam', label: 'Steam', color: '#38bdf8' },
  { id: 'epic', label: 'Epic Games', color: '#a855f7' },
  { id: 'nintendo', label: 'Nintendo eShop', color: '#fb7185' },
  { id: 'riot', label: 'Riot Games', color: '#f43f5e' },
  { id: 'battlenet', label: 'Battle.net', color: '#0ea5e9' },
  { id: 'ea', label: 'EA App', color: '#fb923c' },
  { id: 'ubisoft', label: 'Ubisoft', color: '#a78bfa' },
  { id: 'xbox', label: 'Xbox', color: '#4ade80' },
  { id: 'playstation', label: 'PlayStation', color: '#818cf8' },
];
