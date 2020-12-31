import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'
import { Center, Div, P, Span } from '../components/atoms/Core';
import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Button, Container, Icon, Spinner } from '../components/atoms/Themed';
import { fetchTemplate, TemplateResult } from '../remote-go/Template';
import { fetchController, ControllerResult } from '../remote-go/Controller';
import { useEffect, useState } from 'react';
import Basement from '../components/basements/Basement';
import { NotifyError } from '../components/atoms/Notify';
import SummonPanel from '../components/controller/SummonPanel';
import { CardBase } from '../components/cards/CardBase';
import { SUCCESS } from '../remote-go/Status';

interface Props extends RouteComponentProps<{ id: string }> { }

const Controller: React.FC<Props> = props => {
  const id = props.match.params.id;
  const [controllerResult, setController] = useState<ControllerResult | undefined>(undefined);
  const [templateResult, setTemplate] = useState<TemplateResult | undefined>(undefined);

  useEffect(() => {
    fetchController(id, setController);
    if (controllerResult?.status === SUCCESS) {
      fetchTemplate(id, setTemplate);
    }
  }, [id, controllerResult?.status]);

  if (templateResult !== null && controllerResult !== null) {
    if (controllerResult?.error?.response?.data?.code === "ERR_CONTROLLER_NOT_FOUND") {
      return (
        <Basement>
          <Container fluid="lg">
            <Center>
              <CardBase color="#2A2A2A">
                <Span>
                  <Icon style={{ fontSize: "4rem", marginBottom: "1rem" }} icon={["fas", "ghost"]} />
                  <P style={{ fontSize: "1rem", fontWeight: 800, textTransform: "initial" }}>This controller does not exist...</P>
                </Span>
              </CardBase>
            </Center>
          </Container>
        </Basement>
      )
    }
  }

  return (
    <Basement>
      <Container fluid="lg">
        {/* Error Message (Template) */}
        {templateResult?.error &&
          <NotifyError title="Failed fetch template data" />
        }

        {/* Error Message (Controller) */}
        {controllerResult?.error &&
          <NotifyError title="Failed fetch controller data" />
        }
        <Navbar>
          <Navbar.Brand>
            {/* Loading Message */}
            {templateResult?.error == null &&
              templateResult == null &&
              controllerResult?.error == null &&
              controllerResult == null ?
              <Div>
                <CustomSpinner animation="border" aria-hidden="true" />
                <Span>Loading...</Span>
              </Div>
              :
              <Div>
                <Link to="/">
                  <Button>{"Back"}</Button>
                </Link>
              </Div>
            }
          </Navbar.Brand>
        </Navbar>

        {/* aircon */}
        {(templateResult != null && templateResult?.template != null &&
          controllerResult != null && controllerResult?.controller != null) &&
          <SummonPanel
            controller={controllerResult?.controller}
            template={templateResult?.template}
          />
        }
      </Container>
    </Basement>
  )
}

const CustomSpinner = styled(Spinner)`
  margin-left: 4px;
  margin-right: 4px;
`

export default Controller;