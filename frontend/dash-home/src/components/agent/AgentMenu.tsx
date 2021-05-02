import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button, Nav, Spinner, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';
import { Agent, AgentsResult, fetchAgents } from '../../remote-go/Agents';
import { H1, Span } from '../atoms/Core';
import { AgentEditor } from './AgentEditor';

interface Props {

}

const AgentMenu: React.FC<Props> = props => {
  const { t } = useTranslation();

  const [agentsResult, setAgents] = React.useState<AgentsResult | undefined>(undefined);
  const fetch = () => {
    fetchAgents(setAgents);
  }
  React.useEffect(() => {
    fetch()
  }, [])

  const [create, setCreate] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<Agent | null>(null);

  if (agentsResult === undefined || !agentsResult.agents) {
    return (
      <span>
        <CustomSpinner animation="border" aria-hidden="true" />
        <Span>{t("status.loading")}</Span>
      </span>
    )
  }

  return (
    <div>
      <H1>{t("agent.agent")}</H1>
      <Nav style={{ marginBottom: "1rem" }}>
        <Nav.Item>
          <LinkContainer exact to="/">
            <Button>
              <FontAwesomeIcon icon={["fas", "arrow-left"]} style={{ marginRight: "0.5rem" }} />
              <span>{t("button.back")}</span>
            </Button>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <Button onClick={() => setCreate(true)}>
            <FontAwesomeIcon icon={["fas", "plus"]} style={{ marginRight: "0.5rem" }} />
            <span>{t("button.add")}</span>
          </Button>
          <AgentEditor
            show={create}
            action={'ADD'}
            handleClose={() => {
              fetch();
              setCreate(false);
            }}
          />
        </Nav.Item>
      </Nav>
      <Table variant="dark">
        <thead>
          <tr>
            <th>{t("agent.address")}</th>
            <th>{t("agent.label")}</th>
            <th>{t("agent.status")}</th>
            <th>{t("button.edit")}</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(agentsResult?.agents!).map((agent: Agent) => {
            return (
              <tr key={agent.id}>
                <td>{agent.address}</td>
                <td>{agent.label}</td>
                <td>
                  {
                    agent.online ?
                      <span>
                        <FontAwesomeIcon icon={["fas", "check"]} style={{ marginRight: "0.2rem" }} />
                        {t("status.online")}
                      </span> :
                      <span>
                        <FontAwesomeIcon icon={["fas", "times"]} style={{ marginRight: "0.2rem" }} />
                        {t("status.offline")}
                      </span>
                  }
                </td>
                <td>
                  <Button onClick={() => { setEdit(agent) }}>
                    <FontAwesomeIcon icon={["fas", "edit"]} />
                    <span style={{ paddingLeft: "0.5rem" }}>{t("button.edit")}</span>
                  </Button>
                  <AgentEditor
                    key={agent.id}
                    agent={agent}
                    show={edit?.id === agent.id}
                    action={'EDIT'}
                    handleClose={() => {
                      fetch();
                      setEdit(null);
                    }} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )

}

const CustomSpinner = styled(Spinner)`
  margin-left: 4px;
  margin-right: 4px;
`

export default AgentMenu;