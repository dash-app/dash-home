import * as React from 'react';
import { Modal, Button, Tabs, Card, Tab } from 'react-bootstrap';
import { Remote } from '../../remote-go/Controller';
import { RemotesResult, fetchRemotes } from '../../remote-go/Remotes';
import { NotifyError } from '../atoms/Notify';
import { useTranslation } from 'react-i18next';

interface Props {
  visible: boolean,
  handleClose: any,
  kind: string,
  handleUpdate: any,
}

const RemoteChooser: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const [remotesResult, setRemotesResult] = React.useState<RemotesResult | undefined>(undefined);
  // fetch
  React.useEffect(() => {
    fetchRemotes(setRemotesResult)
  }, [])

  if (!remotesResult?.remotes) {
    if (remotesResult?.error) {
      return (
        <NotifyError title={t("controller.remote.error.getRemote")} />
      )
    } else {
      return (
        <span />
      )
    }
  }

  const allRemotes = remotesResult.remotes;
  const remotes = allRemotes.get(props.kind.toLowerCase());
  if (!remotes) {
    return (
      <Modal
        size="lg"
        show={props.visible}
        backdrop="static"
        variant="dark"
        animation={false}
        centered
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("status.error")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t("controller.remote.error.unknownKind", { kind: props.kind })}</p>
        </Modal.Body>
      </Modal>
    );
  }

  // Sort entry
  Object.keys(remotes).forEach((vendor: string) => remotes[vendor].sort())
  
  return (
    <Modal
      size="lg"
      show={props.visible}
      backdrop="static"
      variant="dark"
      animation={false}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton={props.handleClose && true}>
        <Modal.Title>{t("controller.remote.chooser", { kind: props.kind })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey={remotes[0]} id="tabs">
          {/* Generate kind of vendor/models array... */}
          {Object.keys(remotes).map((vendor: string) => {
            return (
              <Tab eventKey={vendor} title={vendor}>
                {/* Models Card... */}
                {remotes[vendor].map((model: string) => {
                  return (
                    <Card>
                      <Card.Body>
                        <Card.Title>{model}</Card.Title>
                        <Button variant="primary" onClick={() => {
                          props.handleUpdate(
                            ((): Remote => ({
                              vendor: vendor,
                              model: model,
                            }))()
                          );
                          props.handleClose();
                        }}>{t("button.select")}</Button>
                        <Button variant="secondary" disabled>{t("controller.remote.test")}</Button>
                      </Card.Body>
                    </Card>
                  )
                })}
              </Tab>
            )
          })}
        </Tabs>
      </Modal.Body>
    </Modal >
  )
}

export default RemoteChooser;