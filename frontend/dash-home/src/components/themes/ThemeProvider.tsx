import React, { SetStateAction } from 'react';
import { useCookies } from 'react-cookie';

interface Props {
  children: React.ReactNode,
}

export const ThemeContext = React.createContext({
  theme: "CHEEKY_WHITE",
  setTheme: (_: SetStateAction<string>) => { },
});

export const ThemeProvider: React.FC<Props> = props => {
  const [cookies, setCookie] = useCookies(['dash-home']);
  const [theme, setTheme] = React.useState<string>(cookies["theme"] ? cookies["theme"] : "CHEEKY_WHITE");
  React.useEffect(() => {
    document.body.style.backgroundColor = theme === "CHEEKY_WHITE" ? "#FFFFFF" : "#111115";
    setCookie("theme", theme, {
      path: "/",
    })
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}