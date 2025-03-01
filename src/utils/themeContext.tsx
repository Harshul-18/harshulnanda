
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeOption = 'neon' | 'ember' | 'azure' | 'verdant';

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeOption>('ember');
  
  // Apply theme class to body
  useEffect(() => {
    document.body.classList.remove('theme-ember', 'theme-azure', 'theme-verdant');
    
    if (theme === 'ember') {
      document.body.classList.add('theme-ember');
    } else if (theme === 'azure') {
      document.body.classList.add('theme-azure');
    } else if (theme === 'verdant') {
      document.body.classList.add('theme-verdant');
    }
    // Default 'neon' theme doesn't need class as it's the root theme
    
    // Play a sound on theme change
    const audio = new Audio('/whoosh.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
