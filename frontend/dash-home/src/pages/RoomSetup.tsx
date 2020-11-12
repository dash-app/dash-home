import * as React from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Center, Div, H1, P } from '../components/atoms/Core';
import { HR } from '../components/atoms/Themed';

interface Props {
}

const RoomSetup: React.FC<Props> = (props: Props) => {
  var tmpRoomName = "";
  
  const handleSubmit = (event: any) => {
    console.log(tmpRoomName);
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Div>
      <Center>
        <H1 style={{fontSize: "5vmax"}}>Welcome!</H1>
        <HR />
        <P style={{fontSize: "1.8vmax"}}>Please insert room name:</P>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Bed Room"
              aria-label="room name"
              required={true}
              onChange={(e: any) => {
                tmpRoomName = e.currentTarget.value;
              }}
            />
          </Form.Group>
        </Form>
      </Center>
    </Div>
  )
}

export default RoomSetup;