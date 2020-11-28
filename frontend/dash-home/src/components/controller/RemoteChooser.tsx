import * as React from 'react';
import { Modal, Button, Tabs, Card, Tab } from 'react-bootstrap';
import { Remote } from '../../remote-go/Controller';
import { RemotesResult, fetchRemotes } from '../../remote-go/Remotes';
import { NotifyError } from '../atoms/Notify';

interface Props {
  visible: boolean,
  handleClose: any,
  kind: string,
  handleUpdate: any,
}

const RemoteChooser: React.FC<Props> = (props: Props) => {
  const [remotesResult, setRemotesResult] = React.useState<RemotesResult | undefined>(undefined);
  // fetch
  React.useEffect(() => {
    fetchRemotes(setRemotesResult)
  }, [])

  if (!remotesResult?.remotes) {
    if (remotesResult?.error) {
      return (
        <NotifyError title="Failed get remote list" />
      )
    } else {
      return (
        <span />
      )
    }
  }

  const allRemotes: Map<string, { [vendor: string]: string[] }> = new Map<string, { [vendor: string]: string[] }>(Object.entries(remotesResult.remotes));
  const remotes = allRemotes.get(props.kind.toLowerCase())
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
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Unknown kind: {props.kind}</p>
        </Modal.Body>
      </Modal>
    );
  }

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
        <Modal.Title>Select Remote ({props.kind})...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey={remotes[0]} id="tabs">
          {/* Generate kind of vendor/models array... */}
          {Object.entries(remotes).map((r: [string, string[]]) => {
            return (
              <Tab eventKey={r[0]} title={r[0]}>
                {/* Models Card... */}
                {r[1].map((model: string) => {
                  return (
                    <Card>
                      <Card.Body>
                        <Card.Title>{model}</Card.Title>
                        <Button variant="primary" onClick={() => {
                          props.handleUpdate(
                            ((): Remote => ({
                              vendor: r[0],
                              model: model,
                            }))()
                          );
                          props.handleClose();
                        }}>Choose this!</Button>
                        <Button variant="secondary" disabled>Test (Coming Soon...)</Button>
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