import React, { SetStateAction } from 'react';

// TODO: Migrate to ThemeSwitcher. (without react-redux)
// -> Should be use pure state definition.

// Export ThemeContext (Provider & Consumer)
const ThemeContext = React.createContext({
  theme: "CHEEKY_WHITE",
  setTheme: (_: SetStateAction<string>) => {},
});

export default ThemeContext;