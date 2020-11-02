import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'

import { Div, Span } from '../components/atoms/Core';
import { Alert, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Button, Container, Spinner } from '../components/atoms/Themed';

import AirconPanel from '../aircon/Aircon';

import { fetchTemplate, TemplateResult } from '../remote-go/Template';
import { fetchController, ControllerResult } from '../remote-go/Controller';
import { useEffect, useState } from 'react';
import Basement from '../components/basements/Basement';
import { NotifyError } from '../components/atoms/Notify';

interface Props extends RouteComponentProps<{ id: string }> { }

const Controller: React.FC<Props> = props => {
  const id = props.match.params.id;
  const [templateResult, setTemplate] = useState<TemplateResult | undefined>(undefined);
  const [controllerResult, setController] = useState<ControllerResult | undefined>(undefined);

  const fetch = () => {
    fetchTemplate(id, setTemplate);
    fetchController(id, setController);
  };

  useEffect(() => {
    fetch();
  }, []);

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
                <Link to="/controllers">
                  <Button>{"Back"}</Button>
                </Link>
              </Div>
            }
          </Navbar.Brand>
        </Navbar>

        {/* aircon */}
        {(templateResult != null && templateResult?.template != null &&
          controllerResult != null && controllerResult?.controller != null) &&
          controllerResult?.controller.aircon &&

          <AirconPanel
            id={controllerResult?.controller.id}
            name={controllerResult?.controller.name}
            initialState={controllerResult?.controller.aircon}
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