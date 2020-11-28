import * as React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { SwitchBot } from '../../remote-go/Controller';

interface Props {
  initialState?: SwitchBot,
  visible: boolean, //表示の判定用(true=見える)
  handleClose: any,
  handleUpdate: any,
}

const SwitchBotChooser: React.FC<Props> = (props: Props) => {
  // TODO: Macアドレスの記入とコマンドの設定(ドロップダウンで 'press', 'on', 'off' の設定を行えるようにする)
  const [switchBot, setSwitchBot] = React.useState<SwitchBot>(() => {
    return {
      mac: props.initialState ? props.initialState.mac : "",
      type: props.initialState ? props.initialState.type : "TOGGLE",
    }
  });

  const handleSubmit = (event: any) => {
    // propsのhandleUpdateに確定後の処理を委譲する
    props.handleUpdate(switchBot);

    // 送信時のページ遷移を抑止する
    event.preventDefault();
    event.stopPropagation();

    props.handleClose()
  }


  return (
    <Modal
      size="lg"
      show={props.visible}
      onHide={props.handleClose}
      backdrop="static"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>SwitchBot Settings...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Mac Address */}
          <Form.Group>
            <Form.Label>MAC Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="xx:xx:xx:xx:xx:xx"
              defaultValue={props.initialState?.mac}
              required
              onChange={(e: any) => {
                switchBot.mac = e.currentTarget.value;
                setSwitchBot({ ...switchBot });
              }}
            />
          </Form.Group>

          {/* Type */}
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="select"
              as="select"
              defaultValue=""
              required
              onChange={(e: any) => {
                switchBot.type = e.currentTarget.value;
                setSwitchBot({ ...switchBot });
              }}
            >
              <option>TOGGLE</option>
              <option>PRESS</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default SwitchBotChooser;