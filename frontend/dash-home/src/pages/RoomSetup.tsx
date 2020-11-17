import * as React from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Center, Div, H1, P } from '../components/atoms/Core';
import { NotifyError } from '../components/atoms/Notify';
import { Button, HR } from '../components/atoms/Themed';
import { createRoom, RoomResult } from '../remote-go/Room';

interface Props {
}

const RoomSetup: React.FC<Props> = (props: Props) => {
  var tmpRoomName = "";
  const [postResult, setPostResult] = React.useState<RoomResult | undefined>(undefined);

  const handleSubmit = (event: any) => {
    console.log(tmpRoomName);
    createRoom(tmpRoomName, setPostResult);

    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Div>
      <Center>
        <H1 style={{ fontSize: "5vmax" }}>Hello!</H1>
        <HR />
        {postResult?.error && <NotifyError title="Failed create Room" message={postResult.error.data.error} />}
        <P style={{ fontSize: "1.4vmax", fontWeight: 100 }}>Please insert room name:</P>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Bed Room"
              aria-label="room name"
              required={true}
              disabled={postResult && (postResult.status !== "PENDING" && postResult.status !== "FAILED")}
              onChange={(e: any) => {
                tmpRoomName = e.currentTarget.value;
              }}
            />
            <Button type="submit" disabled={postResult && (postResult.status !== "PENDING" && postResult.status !== "FAILED")}>NEXT</Button>
          </Form.Group>
        </Form>
      </Center>

      {/* Welcome Modal */}
      <Modal
        show={postResult?.status === "SUCCESS"}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title><div style={{textAlign: "center"}}>Tada! <span role="img" aria-label="tada">🎉</span></div></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "center" }}>
            <p style={{fontSize: "4rem"}}><span role="img" aria-label="cake">🎂</span></p>
            <p style={{fontSize: "1.5rem", fontWeight: 600}}>Welcome to Dash-App!</p>
            <Button href="/">Open Dashboard</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Div>
  )
}

export default RoomSetup;