import * as React from 'react';
import { Container, Modal, Form, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Controller } from '../../remote-go/Controller';

interface Props {
  controller: Controller,
  handleSubmit: any,
}

const ControllerEditor: React.FC<Props> = (props: Props) => {
  const [controller, setController] = React.useState<Controller>(props.controller);

  const handleSubmit = (event: any) => {
    props.handleSubmit(controller);
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Container fluid="lg">
      <Modal
        show={true}
        backdrop="static"
        keyboard={false}
        variant="dark"
        animation={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Edit: {controller.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {/* Name */}
            <Form.Group>
              <Form.Label>Controller Name</Form.Label>
              <Form.Control
                placeholder="Name"
                aria-label="name"
                defaultValue={controller.name}
                onChange={(e: any) => {
                  controller.name = e.currentTarget.value;
                  setController(controller);
                }}
                required
              />
            </Form.Group>

            {/* Kind */}
            <Form.Group controlId="formGridKind">
              <Form.Label>Kind</Form.Label>
              <Form.Control
                placeholder="Kind"
                aria-label="kind"
                as="select"
                defaultValue={controller.kind}
                onChange={(e: any) => {
                  controller.kind = e.currentTarget.value;
                  setController(controller);
                }}
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
                defaultValue={controller.type}
                required
                onChange={(e: any) => {
                  controller.kind = e.currentTarget.value;
                  setController(controller);
                }}
              >
                <option>REMOTE</option>
              </Form.Control>
            </Form.Group>

            {/* Remote */}
            <Form.Row>
              <Col>
                <Form.Control
                  placeholder="Vendor"
                  defaultValue={controller.remote.vendor}
                  onChange={(e: any) => {
                    controller.remote.vendor = e.currentTarget.value;
                    setController(controller);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Model"
                  defaultValue={controller.remote.model}
                  onChange={(e: any) => {
                    controller.remote.model = e.currentTarget.value;
                    setController(controller);
                  }}
                />
              </Col>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Update</Button>
            <Link to="/controllers">
              <Button variant="secondary">Back</Button>
            </Link>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default ControllerEditor;