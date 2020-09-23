import * as React from 'react';
import Basement from '../components/basements/Basement';
import { Link, RouteComponentProps } from 'react-router-dom'

import { Div, Span } from '../components/atoms/Core';
import { Alert, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Button, Spinner } from '../components/atoms/Themed';

import AirconPanel from '../aircon/Aircon';

import { fetchTemplate, TemplateResult } from '../remote-go/Template';
import { fetchController, ControllerResult } from '../remote-go/Controller';
import { useEffect, useState } from 'react';

interface Props extends RouteComponentProps<{ id: string }> { }

const Controller: React.FC<Props> = props => {
  const id = props.match.params.id;
  const [templateResult, setTemplate] = useState<TemplateResult | undefined>(undefined);
  const [controllerResult, setController] = useState<ControllerResult | undefined>(undefined);

  useEffect(() => {
    fetchTemplate(id, setTemplate);
    fetchController(id, setController);
  }, [id, setTemplate, setController])

  return (
    <Basement>
      {/* Loading Message */}
      {templateResult?.error == null &&
        templateResult == null &&
        controllerResult?.error == null &&
        controllerResult == null &&
        <Div
          style={{ fontSize: "2em" }}
        >
          <CustomSpinner animation="border" aria-hidden="true" />
          <Span>Loading...</Span>
        </Div>
      }

      {/* Error Message (Template) */}
      {templateResult?.error &&
        <Alert variant="danger">
          <Alert.Heading>
            <CustomIcon icon={["fas", "exclamation-triangle"]} />
            <span>Failed fetch template data</span>
          </Alert.Heading>
          <p>(Please see console.)</p>
        </Alert>
      }

      {/* Error Message (Controller) */}
      {controllerResult?.error &&
        <Alert variant="danger">
          <Alert.Heading>
            <CustomIcon icon={["fas", "exclamation-triangle"]} />
            <span>Failed fetch controller data</span>
          </Alert.Heading>
          <p>(Please see console.)</p>
        </Alert>
      }

      {(templateResult != null && templateResult?.template != null &&
        controllerResult != null && controllerResult?.controller != null) &&
        controllerResult?.controller.aircon &&
        <AirconPanel
          aircon={controllerResult?.controller.aircon}
          template={templateResult?.template}
        />
      }

      <Link to=".">
        <Button>Back</Button>
      </Link>
    </Basement>
  )
}


const CustomIcon = styled(FontAwesomeIcon)`
  margin-right: 4px;
`

const CustomSpinner = styled(Spinner)`
  margin-left: 4px;
  margin-right: 4px;
`

export default Controller;