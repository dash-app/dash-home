import * as React from 'react';
import styled from 'styled-components';

interface Props {
    name:string,
}
interface State {}


class Name extends React.Component<Props, State> {
  render() {
    return (
        <div>
            <h1>Hello, {this.props.name}!</h1>
        </div>
    );
  }
};

export default Name;