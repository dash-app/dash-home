import * as React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Center, Div, H1, P } from '../components/atoms/Core';
import { NotifyError } from '../components/atoms/Notify';
import { HR } from '../components/atoms/Themed';
import { createRoom, RoomResult } from '../remote-go/Room';

interface Props {
}

const RoomSetup: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  
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
        <H1 style={{ fontSize: "5vmax" }}>{t("room.setup.title")}</H1>
        <HR />
        {postResult?.error && <NotifyError title={t("room.error.create")} message={postResult.error.data.error} />}
        <P style={{ fontSize: "1.4vmax", fontWeight: 100 }}>{t("room.setup.description")}</P>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder={t("room.setup.roomName.placeholder")}
              aria-label={t("room.setup.roomName.ariaLabel")}
              required={true}
              disabled={postResult && (postResult.status !== "PENDING" && postResult.status !== "FAILED")}
              onChange={(e: any) => {
                tmpRoomName = e.currentTarget.value;
              }}
            />
            <Button type="submit" disabled={postResult && (postResult.status !== "PENDING" && postResult.status !== "FAILED")}>{t("button.next")}</Button>
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
          <Modal.Title><div style={{textAlign: "center"}}>{t("room.setup.welcome.title")} <span role="img" aria-label="tada">🎉</span></div></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "center" }}>
            <p style={{fontSize: "4rem"}}><span role="img" aria-label="cake">🎂</span></p>
            <p style={{fontSize: "1.5rem", fontWeight: 600}}>{t("room.setup.welcome.description")}</p>
            <Button href="/">{t("dashboard.open")}</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Div>
  )
}

export default RoomSetup;