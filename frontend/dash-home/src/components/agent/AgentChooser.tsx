import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Agent, AgentsResult, fetchAgents } from '../../remote-go/Agents';
import { Button, Modal, Card } from 'react-bootstrap';
import { P } from '../atoms/Core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  checkedId?: string,
  visible: boolean,
  handleClose: any,
  handleUpdate: any,
}

const AgentChooser: React.FC<Props> = props => {
  const { t } = useTranslation();
  const [agentsResult, setAgents] = React.useState<AgentsResult | undefined>(undefined);
  const fetch = () => {
    fetchAgents(setAgents);
  }
  React.useEffect(() => {
    fetch()
  }, [])

  return (
    <Modal
      show={props.visible}
      onHide={props.handleClose && props.handleClose}
      centered
      backdropClassName="modal-backdrop-2"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("agent.chooser")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {agentsResult?.agents?.map((agent: Agent) => (
          <div key={agent.id}>
            <Card.Body>
              <P style={{ fontWeight: "bold" }}>
                {props.checkedId == agent.id && <FontAwesomeIcon icon={["fas", "check"]} style={{ marginRight: "0.2rem" }} />}
                <span>{agent.address}</span>
              </P>
              <div style={{ backgroundColor: "#0A0A0A", padding: "1rem" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>ID: </span>
                  <span>{agent.id}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{t("agent.label")}: </span>
                  <span>{agent.label ? agent.label : "-"}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{t("agent.default")}: </span>
                  <span>{agent.default ? "Yes" : "No"}</span>
                </div>
              </div>
              <Button
                onClick={() => props.handleUpdate(agent)}
              >
                {t("button.select")}
              </Button>
            </Card.Body>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="mr-auto"
          onClick={() => props.handleUpdate(null)}
        >
          {t("agent.useDefault")}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AgentChooser;