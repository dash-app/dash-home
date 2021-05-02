import * as React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { Agent, AgentResult, updateAgent, addAgent, deleteAgent } from '../../remote-go/Agents';
import { FAILED, PENDING, SUCCESS } from '../../remote-go/Status';
import { P } from '../atoms/Core';
import { NotifyError } from '../atoms/Notify';
import { Spinner } from '../atoms/Themed';

interface Props {
  agent?: Agent,
  show: boolean,
  action: ActionType,
  handleClose?: any,
}

const initial: Agent = {
  id: "",
  address: "",
  default: false,
  label: "",
}

export type ActionType = 'ADD' | 'EDIT' | 'DELETE';

export const AgentEditor: React.FC<Props> = props => {
  console.log(props.agent)
  const { t } = useTranslation();

  const [agent, setAgent] = React.useState<Agent>(initial);
  React.useEffect(() => {
    if (props.agent) {
      setAgent({ ...props.agent })
    }
  }, [props.agent])

  const [postResult, setPostResult] = React.useState<AgentResult | undefined>(undefined);

  const handleDelete = () => {
    if (props.agent) {
      deleteAgent(props.agent?.id, setPostResult)
    }
  }

  const handleSubmit = (event: any) => {
    if (props.agent) {
      if (props.action === 'EDIT') {
        updateAgent(props.agent?.id, agent, setPostResult)
      }
    } else if (props.action === 'ADD') {
      addAgent(agent, setPostResult)
    }
    event.preventDefault();
    event.stopPropagation();
  }

  if (props.action === 'DELETE') {
    // Return Error dialog when try default agent...
    if (props.agent?.default) {
      return (
        <Modal show={props.show} onHide={props.handleClose && props.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("agent.delete.title")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <P>{t("agent.delete.error.defaultAgent")}</P>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose && props.handleClose}>{t("button.close")}</Button>
          </Modal.Footer>
        </Modal>
      )
    }

    // Confirm
    if (postResult?.status !== SUCCESS) {
      return (
        <Modal show={props.show} onHide={props.handleClose && props.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("agent.delete.title")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <P>{t("agent.delete.question")}</P>
            <P>{t("agent.delete.confirm")}</P>
            <div>
              {postResult && postResult.status === FAILED && <NotifyError title="Failed send request" message={`${postResult.error!.response?.data.error ? postResult.error!.response.data.error : postResult.error!}`} />}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose && props.handleClose}>{t("button.cancel")}</Button>
            <Button variant="danger" onClick={() => handleDelete()}>{t("button.delete")}</Button>
          </Modal.Footer>
        </Modal>
      )
    }

    // Success
    if (postResult?.status === SUCCESS) {
      return (
        <Modal show={props.show} onHide={props.handleClose && props.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("agent.delete.title")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <P>{t("agent.delete.success")}</P>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose && props.handleClose}>{t("button.close")}</Button>
          </Modal.Footer>
        </Modal>
      )
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleClose && props.handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.action === 'ADD' && t("agent.add.title")}
            {props.action === 'EDIT' && t("agent.edit.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Address */}
          <Form.Group>
            <Form.Label>
              <P>{t("agent.address")}</P>
            </Form.Label>
            <Form.Control
              defaultValue={props.agent && props.agent.address}
              placeholder="localhost:8081"
              aria-label={t("agent.address")}
              onChange={(e: any) => {
                agent.address = e.currentTarget.value;
                setAgent({ ...agent });
              }}
              required
            />
          </Form.Group>

          {/* Label */}
          <Form.Group>
            <Form.Label>
              <P>{t("agent.label")}</P>
            </Form.Label>
            <Form.Control
              defaultValue={props.agent && props.agent.label}
              placeholder="..."
              aria-label={t("agent.label")}
              onChange={(e: any) => {
                agent.label = e.currentTarget.value;
                setAgent({ ...agent });
              }}
            />
          </Form.Group>

          {/* Default */}
          <Form.Group>
            <Form.Label>
              <P>{t("agent.default")}</P>
            </Form.Label>
            <Form.Check
              id="agent_default"
              type="switch"
              aria-label={t("agent.default")}
              onChange={(e: any) => {
                agent.default = e.currentTarget.checked;
                setAgent({ ...agent });
              }}
              defaultChecked={props.agent && props.agent.default}
            />
          </Form.Group>
          <div>
            {postResult && postResult.status === FAILED && <NotifyError title="Failed send request" message={`${postResult.error!.response?.data.error ? postResult.error!.response.data.error : postResult.error!}`} />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {postResult && postResult.status === PENDING && <Spinner animation="border" aria-hidden="true" />}
          {postResult && postResult.status === SUCCESS && <Redirect to="/agent" />}
          {props.action === 'ADD' && <Button type="submit" disabled={postResult && postResult.status === PENDING}>{t("button.add")}</Button>}
          {props.action === 'EDIT' && <Button type="submit" disabled={postResult && postResult.status === PENDING}>{t("button.edit")}</Button>}
          <Button variant="secondary" onClick={props.handleClose && props.handleClose}>{t("button.back")}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}