import React, { SetStateAction } from 'react';

interface Props {
  children: React.ReactNode,
}

export const ThemeContext = React.createContext({
  theme: "CHEEKY_WHITE",
  setTheme: (_: SetStateAction<string>) => { },
});

export const ThemeProvider: React.FC<Props> = props => {
  const [theme, setTheme] = React.useState<string>(localStorage.getItem("theme") ? localStorage.getItem("theme")! : "CHEEKY_WHITE")
  React.useEffect(() => {
    document.body.style.backgroundColor = theme === "CHEEKY_WHITE" ? "#FFFFFF" : "#111115";
    localStorage.setItem('theme', theme);
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}