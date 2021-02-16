import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
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
          variant={theme === "CHEEKY_WHITE" ? "primary" : ""}
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
          variant={theme === "NERD_BLACK" ? "primary" : ""}
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