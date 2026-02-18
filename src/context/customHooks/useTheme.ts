import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

import type { IThemeContext } from '../ThemeContext';


export default function useTheme(): IThemeContext {
    const context = useContext(ThemeContext);

    if (!context) 
        throw new Error('useTheme must be used within a ThemeProvider');
  

  return context;
};