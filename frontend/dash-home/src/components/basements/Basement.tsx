import * as React from 'react';

// Navbar
import Navigation from '../navbar/Navigation';
import { Dispatch } from 'redux';
import { Container } from '../atoms/Themed';
import { Div } from '../atoms/Core';
import { connect } from 'react-redux';
import { ThemeAction } from '../../reducers/themes/type';

interface Props {
  children: React.ReactNode,
  theme: string
}
interface State { }

const mapStateToProps = (store: { themes: ThemeAction }) => {
  return {
    theme: store.themes.name,
  }
}

const mapDispatchToProps = (dispatch: Dispatch, Props: Props) => ({
})

class Basement extends React.Component<Props, State> {
  static defaultProps: { theme: string; };
  
  render() {
    console.log(this.props);
    return (
      <Div>
        <Navigation theme={this.props.theme} roomName={"room"} />
        <Container fluid>
          {this.props.children}
        </Container>
      </Div>
    )
  }
}

Basement.defaultProps = {
  theme: "CHEEKY_WHITE"
};

export default connect(mapStateToProps, mapDispatchToProps)(Basement);