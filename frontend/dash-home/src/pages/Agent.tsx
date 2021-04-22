import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { Button, Container, Navbar } from 'react-bootstrap';
import Basement from '../components/basements/Basement';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';
import AgentMenu from '../components/agent/AgentMenu';

interface Props {
}

const Agent: React.FC<Props> = props => {
  const { t } = useTranslation();

  return (
    <Basement>
      <Container fluid="lg">
        <Navbar>
          <LinkContainer exact to="/">
            <Button>
              <FontAwesomeIcon icon={["fas", "arrow-left"]}/>
              <span style={{ paddingLeft: "0.5rem" }}>{t("button.back")}</span>
            </Button>
          </LinkContainer>
        </Navbar>

        <div>
          <AgentMenu />
        </div>
      </Container>
    </Basement>
  )
}

export default Agent;