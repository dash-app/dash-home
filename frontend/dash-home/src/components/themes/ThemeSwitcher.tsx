import * as React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Button } from '../atoms/Themed';
import { P } from '../atoms/Core';
import { ThemeContext } from './ThemeProvider';

interface Props { }

const ThemeSwitcher: React.FC<Props> = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <span>
      <span>
        <P>Current: {theme}</P>
      </span>
      <ButtonGroup>
        <Button
          type="radio"
          onClick={() => {
            setTheme("CHEEKY_WHITE")
          }}
          key={"CHEEKY_WHITE"}
          selected={theme === "CHEEKY_WHITE"}
        >
          Cheeky White
        </Button>
        <Button
          type="radio"
          onClick={() => {
            setTheme("NERD_BLACK")
          }}
          key={"NERD_BLACK"}
          selected={theme === "NERD_BLACK"}
        >
          Nerd Black
        </Button>
      </ButtonGroup>
    </span>
  )
}

export default ThemeSwitcher;