import * as React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { SwitchBot } from '../../remote-go/Controller';
import { P } from '../atoms/Core';
import { ThemedModal } from '../atoms/Themed';

interface Props {
  initialState?: SwitchBot,
  visible: boolean, //表示の判定用(true=見える)
  handleClose: any,
  handleUpdate: any,
}

const SwitchBotChooser: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();

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
    <ThemedModal
      size="lg"
      show={props.visible}
      onHide={props.handleClose}
      backdrop="static"
      backdropClassName="modal-backdrop-2"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t("controller.switchbot.chooser")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Mac Address */}
          <Form.Group>
            <Form.Label><P>{t("controller.switchbot.mac")}</P></Form.Label>
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
            <Form.Label><P>Type</P></Form.Label>
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
            {t("button.update")}
          </Button>
        </Modal.Footer>
      </Form>
    </ThemedModal>
  )
}

export default SwitchBotChooser;