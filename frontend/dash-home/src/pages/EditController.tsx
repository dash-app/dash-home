import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Container, Nav, Button, Modal, Alert, Spinner, FormControl, InputGroup, Form } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Div, H2 } from '../components/atoms/Core';
import { HR } from '../components/atoms/Themed';
import Basement from "../components/basements/Basement";
import { Controller, ControllerResult, fetchController } from '../remote-go/Controller';

interface Props extends RouteComponentProps<{ id: string }> {
  controller: Controller,

}

const EditController: React.FC<Props> = (props: Props) => {
  const id = props.match.params.id;
  const [controllerResult, setController] = React.useState<ControllerResult | undefined>(undefined);

  const [controller, updateController] = React.useState<Controller | undefined>(undefined);

  React.useEffect(() => {
    fetchController(id, setController);
    console.debug(`:: Edit...`);
  }, []);

  const handleSubmit = (event: any) => {
    console.debug(event.currentTarget);

    event.preventDefault();
    event.stopPropagation();
  }

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

        {controllerResult && controllerResult?.error == null &&
          <Modal
            show={true}
            backdrop="static"
            keyboard={false}
            variant="dark"
            animation={false}
          >
            <Modal.Header>
              <Modal.Title>Edit: {controllerResult.controller?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              {/* Name */}
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Controller Name</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    aria-label="name"
                    defaultValue={controllerResult.controller?.name}
                    onChange={(e: any) => {
                      console.log(e.currentTarget.value);
                    }}
                    required
                  />
                </Form.Group>

                {/* Kind */}
                <Form.Group>
                  <Form.Label>Kind</Form.Label>
                  <Form.Control
                    placeholder="Kind"
                    aria-label="kind"
                    as="select"
                    defaultValue={controllerResult.controller?.kind}
                    required
                  >
                    <option>AIRCON</option>
                  </Form.Control>
                </Form.Group>

                {/* Type */}
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    placeholder="Type"
                    aria-label="type"
                    as="select"
                    defaultValue={controllerResult.controller?.type}
                    required
                  >
                    <option>REMOTE</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Button type="submit">
                    Update
                  </Button>
                </Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        }
      </Container>
    </Basement>
  )
}

const CustomIcon = styled(FontAwesomeIcon)`
  margin-right: 4px;
`

export default EditController;