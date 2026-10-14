import { FilterOption } from '../types/game.types';

export const STATUS_FILTERS: FilterOption[] = [
  { id: 'ALL', label: 'Todos', color: '#94a3b8' },
  { id: 'FAVORITES', label: '⭐ Favoritos', color: '#fbbf24' },
  { id: 'PLAYING', label: 'Jugando', color: '#4ade80' },
  { id: 'COMPLETED', label: 'Completados', color: '#f59e0b' },
  { id: 'BACKLOG', label: 'Pendientes', color: '#a1a1aa' },
  { id: 'WISHLIST', label: 'Deseados', color: '#f472b6' },
];

export const PLATFORM_FILTERS: FilterOption[] = [
  { id: 'ALL', label: 'Todas', color: '#94a3b8' },
  { id: 'STEAM', label: 'Steam', color: '#93c5fd' },
  { id: 'EPIC', label: 'Epic Games', color: '#d8b4fe' },
  { id: 'NINTENDO', label: 'Nintendo', color: '#fca5a5' },
  { id: 'XBOX', label: 'Xbox', color: '#86efac' },
  { id: 'PLAYSTATION', label: 'PlayStation', color: '#93c5fd' },
  { id: 'RIOT', label: 'Riot Games', color: '#fda4af' },
  { id: 'BATTLENET', label: 'Battle.net', color: '#93c5fd' },
  { id: 'EA', label: 'EA App', color: '#fed7aa' },
  { id: 'UBISOFT', label: 'Ubisoft', color: '#c4b5fd' },
  { id: 'PC', label: 'PC', color: '#94a3b8' },
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
  { id: 'all', label: 'Todas las Tiendas', color: '#94a3b8' },
  { id: 'steam', label: 'Steam', color: '#93c5fd' },
  { id: 'epic', label: 'Epic Games', color: '#d8b4fe' },
  { id: 'nintendo', label: 'Nintendo eShop', color: '#fca5a5' },
  { id: 'riot', label: 'Riot Games', color: '#fda4af' },
  { id: 'battlenet', label: 'Battle.net', color: '#93c5fd' },
  { id: 'ea', label: 'EA App', color: '#fed7aa' },
  { id: 'ubisoft', label: 'Ubisoft', color: '#c4b5fd' },
  { id: 'xbox', label: 'Xbox', color: '#86efac' },
  { id: 'playstation', label: 'PlayStation', color: '#93c5fd' },
];
