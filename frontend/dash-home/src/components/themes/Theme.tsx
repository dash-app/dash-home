import React from 'react';

// TODO: Migrate to ThemeSwitcher. (without react-redux)
// -> Should be use pure state definition.

// Export ThemeContext (Provider & Consumer)
const ThemeContext = React.createContext("CHEEKY_WHITE");

export default ThemeContext;