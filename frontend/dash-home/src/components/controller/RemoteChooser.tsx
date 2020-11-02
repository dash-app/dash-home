import * as React from 'react';
import { Modal, Button, Tabs, Card, Tab } from 'react-bootstrap';
import { RemotesResult, fetchRemotes } from '../../remote-go/Remotes';

interface Props {
  visible: boolean,
  handleClose: any,
  kind: string,
}

const RemoteChooser: React.FC<Props> = (props: Props) => {
  const [remotes, setRemotes] = React.useState<RemotesResult | undefined>(undefined);
  // fetch
  React.useEffect(() => {
    fetchRemotes(setRemotes)
  }, [])

  // TODO: Resultをもとにリストを展開する
  return (
    <Modal
      size="lg"
      show={props.visible}
      backdroup="static"
      variant="dark"
      animation={false}
      centered
    >
      <Modal.Header>
        <Modal.Title>Select Remote ({props.kind})...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultAcitveKey="daikin" id="tabs">
          <Tab eventKey="daikin" title="Daikin">
            {/* Models Card... */}
            <Card>
              <Card.Body>
                <Card.Title>Daikin01</Card.Title>
                <Button variant="primary">Choose this!</Button>
                <Button variant="outline-primary">Send test signal</Button>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  )
}

export default RemoteChooser;