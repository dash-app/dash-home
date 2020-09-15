import * as React from 'react';

// Navbar
import Navigation from '../navbar/Navigation';
import { Dispatch } from 'redux';
import { Container } from '../atoms/Themed';
import { Div } from '../atoms/Core';
import { connect } from 'react-redux';
import { ThemeAction } from '../../reducers/themes/type';
import ThemeContext from '../themes/Theme';

interface Props {
  children: React.ReactNode,
}

interface State { }

class Basement extends React.Component<Props, State> {
  render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <Div>
            <Navigation theme={theme} roomName={"room"} />
            <Container fluid>
              {this.props.children}
            </Container>
          </Div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default Basement;