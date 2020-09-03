import * as React from 'react';
import Basement from '../components/basements/Basement';

interface Props {
  c: string,
}
interface State { }

class Controller extends React.Component<Props, State> {
  render() {
    return (
      <Basement>
        <h1>Dash-Home</h1>
        <p>This application made for all peoples.</p>
        <div>{this.props.c}</div>
      </Basement>
    );
  }
};

export default Controller;