import * as React from 'react';
import Basement from "../components/basements/Basement";
import { Container, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { Div, H1, P } from '../components/atoms/Core';
import { Controller, ControllerResult, createController, Remote, SwitchBot } from '../remote-go/Controller';
import { FAILED, PENDING, SUCCESS } from '../remote-go/Status';
import { Link, Redirect } from 'react-router-dom';
import { Spinner, Button } from '../components/atoms/Themed';
import RemoteChooser from '../components/controller/RemoteChooser';
import SwitchBotChooser from '../components/controller/SwitchBotChooser';
import { NotifyError } from '../components/atoms/Notify';

interface Props { }

const NewController: React.FC<Props> = () => {
  const initial: Controller = {
    id: "",
    name: "",
    kind: "AIRCON",
    type: "REMOTE",
  }

  // Saving current definition
  const [controller, setController] = React.useState<Controller>(initial);

  // Handle window state (remote/switchbot editor...)
  const [openChooser, setOpenChooser] = React.useState<boolean>(false);
  const [switchBotChooser, setSwitchBotChooser] = React.useState<boolean>(false);

  // Create Result
  const [postResult, setPostResult] = React.useState<ControllerResult | undefined>(undefined);

  const handleSubmit = (event: any) => {
    // props.handleSubmit(controller);
    console.log(controller);

    // Submit
    createController(controller, setPostResult)

    event.preventDefault();
    event.stopPropagation();
  }

  if (postResult?.error) {
    console.log(postResult.error)
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
              {["AIRCON", "LIGHT"].map((e) => {
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
            <Form.Label><P>Type: {controller.type}</P></Form.Label>
            <DropdownButton title={controller.type} drop="right">
              {["REMOTE", "SWITCHBOT"].map((e) => {
                return (
                  <Dropdown.Item
                    key={e}
                    onClick={() => {
                      controller.type = e;
                      setController({ ...controller });
                    }}
                    active={e === controller.type}
                  >
                    {e}
                  </Dropdown.Item>
                )
              })}
            </DropdownButton>
          </Form.Group>

          {/* Show remote option (when choosed remote type) */}
          {controller.type === "REMOTE" &&
            <Form.Group>
              <Form.Label>
                {controller.remote ?
                  (<P>Vendor: {controller.remote?.vendor + "/" + controller.remote?.model}</P>)
                  :
                  (<P>Vendor</P>)
                }
              </Form.Label>
              <Div>
                <Button onClick={() => setOpenChooser(true)}>Select Remote...</Button>
                {/* Modal */}
                <RemoteChooser
                  visible={openChooser}
                  handleClose={() => setOpenChooser(false)}
                  kind={controller.kind}
                  handleUpdate={(remote: Remote) => {
                    controller.remote = remote;
                    setController({ ...controller });
                  }}
                />
              </Div>
            </Form.Group>
          }

          {/* Show switchbot option (when choosed switchbot type) */}
          {controller.type === "SWITCHBOT" &&
            <Form.Group>
              <Form.Label>
                <P>MAC: {controller.switchbot?.mac !== undefined && controller.switchbot?.mac}</P>
                <P>Type: {controller.switchbot?.type !== undefined && controller.switchbot?.type}</P>
              </Form.Label>
              <Div>
                <Button onClick={() => setSwitchBotChooser(true)}>Open SwitchBot Settings...</Button>
                <SwitchBotChooser
                  initialState={controller.switchbot}
                  visible={switchBotChooser}
                  handleClose={() => setSwitchBotChooser(false)}
                  handleUpdate={(switchbot: SwitchBot) => {
                    controller.switchbot = switchbot;
                    setController({ ...controller });
                  }}
                />
              </Div>
            </Form.Group>
          }

          <Button type="submit" disabled={postResult && postResult.status === PENDING}>Update</Button>
          <Link to="/controllers">
            <Button variant="secondary">Back</Button>
          </Link>
          <Div>
            {postResult && postResult.status === PENDING && <Spinner aria-hidden="true" />}
            {/* {postResult && postResult.status === SUCCESS && <Icon icon={["fas", "check"]} />} */}
            {postResult && postResult.status === SUCCESS && <Redirect to="/controllers" />}
            {postResult && postResult.status === FAILED && <NotifyError title="Failed create controller" message={`${postResult.error!.response?.data.error ? postResult.error!.response.data.error : postResult.error!}`} />}
          </Div>
        </Form>
      </Container>
    </Basement>
  )
}

export default NewController;