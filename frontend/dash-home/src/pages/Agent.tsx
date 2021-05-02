import * as React from 'react';
import { Container } from 'react-bootstrap';
import Basement from '../components/basements/Basement';
import AgentMenu from '../components/agent/AgentMenu';

interface Props {
}

const Agent: React.FC<Props> = props => {
  return (
    <Basement>
      <Container fluid="lg">
        <div>
          <AgentMenu />
        </div>
      </Container>
    </Basement>
  )
}

export default Agent;