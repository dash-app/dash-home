import * as React from 'react';
import Basement from "../components/basements/Basement";
import { ButtonGroup, Container, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { Div, H1, P } from '../components/atoms/Core';
import { Controller } from '../remote-go/Controller';
import { FAILED, PENDING, Status, SUCCESS } from '../remote-go/Status';
import { Link } from 'react-router-dom';
import { SpinnerInvert, IconInvert, Button } from '../components/atoms/Themed';
import RemoteChooser from '../components/controller/RemoteChooser';

interface Props {
  status: Status,
}

const NewController: React.FC<Props> = (props: Props) => {
  const initial: Controller = {
    id: "",
    name: "",
    kind: "AIRCON",
    type: "REMOTE",
  }

  const [controller, setController] = React.useState<Controller>(initial);

  const [openChooser, setOpenChooser] = React.useState<boolean>(false);

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
                setController({ ...controller });
              }}
              required
            ></Form.Control>
          </Form.Group>

          {/* Kind */}
          <Form.Group>
            <Form.Label><P>Kind: {controller.kind}</P></Form.Label>
            <DropdownButton title={controller.kind} drop="right">
              {["AIRCON"].map((e) => {
                return (
                  <Dropdown.Item
                    key={e}
                    onClick={() => {
                      controller.kind = e;
                      setController({ ...controller });
                    }}
                    active={e === controller.kind}
                  >
                    {e}
                  </Dropdown.Item>
                )
              })}
            </DropdownButton>
          </Form.Group>

          {/* Type */}
          <Form.Group>
            <Form.Label><P>Type</P></Form.Label>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {controller.type ? controller.type : "Select Type..."}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {["REMOTE", "SWITCHBOT"].map((e) => {
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        controller.type = e;
                        setController({ ...controller });
                      }}
                    >
                      {e}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          {/* Show remote option (when choosed remote type) */}
          {controller.type === "REMOTE" &&
            <Form.Group>
              <Form.Label><P>Vendor: ....</P></Form.Label>
              <Div>                
                <Button onClick={() => {
                  setOpenChooser(true);
                }}>// Select Remote...</Button>
                {/* Modal */}
                <RemoteChooser
                  visible={openChooser}
                  handleClose={() => setOpenChooser(false)}
                  kind={controller.kind}
                />
              </Div>
            </Form.Group>
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