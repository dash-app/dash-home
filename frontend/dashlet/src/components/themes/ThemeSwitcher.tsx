import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { ThemeContext } from './ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcher: React.FC = props => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <span>
      <ButtonGroup>
        <ToggleButton
          type="radio"
          onClick={() => {
            setTheme('CHEEKY_WHITE');
          }}
          key={'CHEEKY_WHITE'}
          variant={theme === 'CHEEKY_WHITE' ? 'primary' : ''}
          value="CHEEKY_WHITE" id={''}>
          {/* Cheeky White */}
          <FontAwesomeIcon icon={faSun} style={{ fontSize: '1.5rem' }} />
        </ToggleButton>
        <ToggleButton
          type="radio"
          onClick={() => {
            setTheme('NERD_BLACK');
          }}
          key={'NERD_BLACK'}
          variant={theme === 'NERD_BLACK' ? 'primary' : ''}
          value="NERD_BLACK" id={''}>
          {/* Nerd Black */}
          <FontAwesomeIcon icon={faMoon} style={{ fontSize: '1.5rem' }} />
        </ToggleButton>
      </ButtonGroup>
    </span>
  );
};

export default ThemeSwitcher;