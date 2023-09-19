import React, { SetStateAction } from 'react';
import { GetThemeEntry } from './Theme';

interface Props {
  children: React.ReactNode,
}

interface Context {
  theme: string,
  setTheme: (_: SetStateAction<string>) => void,
}

export const ThemeContext = React.createContext<Context>({
  theme: 'CHEEKY_WHITE',
  setTheme: () => null,
});

export const ThemeProvider: React.FC<Props> = props => {
  const [theme, setTheme] = React.useState<string>(localStorage.getItem('theme') ?? 'CHEEKY_WHITE');
  React.useEffect(() => {
    // document.body.style.backgroundColor = '#000000';
    document.body.className = `background-${GetThemeEntry(theme).variant.name}`;
    localStorage.setItem('theme', theme);
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};