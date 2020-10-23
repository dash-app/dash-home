import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Container, Nav, Button, Modal, Alert, Spinner, FormControl, InputGroup, Form, Col } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Div, H2 } from '../components/atoms/Core';
import { HR } from '../components/atoms/Themed';
import Basement from "../components/basements/Basement";
import ControllerEditor from "../components/controller/ControllerEditor";
import { Controller, ControllerResult, fetchController, updateController } from '../remote-go/Controller';
import { NONE, PENDING, Status } from '../remote-go/Status';

interface Props extends RouteComponentProps<{ id: string }> {
  controller: Controller,
}

const EditController: React.FC<Props> = (props: Props) => {
  const id = props.match.params.id;
  const [initialControllerResult, setInitialControllerResult] = React.useState<ControllerResult | undefined>(undefined);
  const [controllerResult, setControllerResult] = React.useState<ControllerResult | undefined>(undefined);

  React.useEffect(() => {
    fetchController(id, setInitialControllerResult);
    console.debug(`:: Edit...`);
  }, [id]);

  return (
    <Basement>
      <Container fluid="lg">
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

        {initialControllerResult && initialControllerResult?.error == null &&
          <ControllerEditor 
            controller={initialControllerResult?.controller!}
            status={controllerResult ? controllerResult.status : NONE}
            handleSubmit={(c: Controller) => {
              updateController(id, c, setControllerResult)
            }}
          />
        }
      </Container>
    </Basement>
  )
}

const CustomIcon = styled(FontAwesomeIcon)`
  margin-right: 4px;
`

export default EditController;