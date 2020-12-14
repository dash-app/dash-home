import * as React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Button } from '../atoms/Themed';
import { ThemeContext } from './ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  otaku?: boolean,
}

const ThemeSwitcher: React.FC<Props> = props => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <span>
      <ButtonGroup>
        <Button
          type="radio"
          onClick={() => {
            setTheme("CHEEKY_WHITE")
          }}
          key={"CHEEKY_WHITE"}
          selected={theme === "CHEEKY_WHITE"}
        >
          {/* Cheeky White */}
          {props.otaku ?
            <p style={{ fontSize: "1rem" }}>😎</p>
            :
            <FontAwesomeIcon icon={["fas", "sun"]} style={{ fontSize: "1.5rem" }} />
          }
        </Button>
        <Button
          type="radio"
          onClick={() => {
            setTheme("NERD_BLACK")
          }}
          key={"NERD_BLACK"}
          selected={theme === "NERD_BLACK"}
        >
          {/* Nerd Black */}
          {props.otaku ?
            <p style={{ fontSize: "1rem" }}>🤓</p>
            :
            <FontAwesomeIcon icon={["fas", "moon"]} style={{ fontSize: "1.5rem" }} />
          }
        </Button>
      </ButtonGroup>
    </span>
  )
}

export default ThemeSwitcher;