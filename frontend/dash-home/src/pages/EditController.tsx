import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Basement from "../components/basements/Basement";
import ControllerEditor from "../components/controller/ControllerEditor";
import { Controller, ControllerResult, fetchController, updateController } from '../remote-go/Controller';
import { NONE } from '../remote-go/Status';
import { NotifyError } from '../components/atoms/Notify';

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
    <Container fluid="lg">
      {/* Error Message (Controller) */}
      {controllerResult?.error &&
        <NotifyError title="Failed fetch controller data" />
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
  )
}

export default EditController;