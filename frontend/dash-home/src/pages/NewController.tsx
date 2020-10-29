import * as React from 'react';
import Basement from "../components/basements/Basement";
import { Button, Container, Form } from 'react-bootstrap';
import { H1, P } from '../components/atoms/Core';
import { Controller } from '../remote-go/Controller';
import { FAILED, PENDING, Status, SUCCESS } from '../remote-go/Status';
import { Link } from 'react-router-dom';
import { SpinnerInvert, IconInvert } from '../components/atoms/Themed';

interface Props { 
  status: Status,
}

const NewController: React.FC<Props> = (props: Props) => {
  const initial: Controller = {
    id: "",
    name: "",
    kind: "",
    type: "",
  }

  const [controller, setController] = React.useState<Controller>(initial);


  const handleSubmit = (event: any) => {
    // props.handleSubmit(controller);
    console.log(controller);
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Basement>
      <Container fluid="lg">
        <H1>New Controller...</H1>

        {/* Form */}
        <Form onSubmit={handleSubmit}>

          {/* Name */}
          <Form.Group>
            <Form.Label><P>Controller Name</P></Form.Label>
            <Form.Control
              placeholder="Bedroom Light"
              aria-label="name"
              onChange={(e: any) => {
                controller.name = e.currentTarget.value;
                setController(controller)
              }}
              required
            ></Form.Control>
          </Form.Group>

          {/* Kind */}
          <Form.Group>
            <Form.Label><P>Kind</P></Form.Label>
            <Form.Control
              placeholder="Kind"
              aria-label="kind"
              as="select"
              defaultValue="AIRCON"
              onChange={(e: any) => {
                controller.kind = e.currentTarget.value;
                setController(controller)
              }}
            >
              <option>AIRCON</option>
            </Form.Control>
          </Form.Group>

          {/* Type */}
          <Form.Group>
            <Form.Label><P>Type</P></Form.Label>
            <Form.Control
              placeholder="Type"
              aria-label="type"
              as="select"
              defaultValue="REMOTE"
              onChange={(e: any) => {
                controller.type = e;
                setController(controller)
              }}
            >
              <option>REMOTE</option>
            </Form.Control>
          </Form.Group>

          {/* Show remote option (when choosed remote type) */}
          {controller.type === "REMOTE" &&
            <Form.Label><P>Vendor: ....</P></Form.Label>
          }

          {props.status === PENDING && <SpinnerInvert aria-hidden="true" />}
          {props.status === SUCCESS && <IconInvert icon={["fas", "check"]} />}
          {props.status === FAILED && <IconInvert icon={["fas", "exclamation-triangle"]} />}
          <Button type="submit" disabled={props.status === PENDING}>Update</Button>
          <Link to="/controllers">
            <Button variant="secondary">Back</Button>
          </Link>
        </Form>

      </Container>
    </Basement>
  )
}

export default NewController;