import { createContext } from 'react';

// Defines the shape of our context
// Definimos la forma de nuestro contexto
export const ThemeContext = createContext({
  toggleColorMode: () => {},
});