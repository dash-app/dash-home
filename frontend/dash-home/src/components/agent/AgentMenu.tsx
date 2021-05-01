import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Agent, AgentsResult, fetchAgents } from '../../remote-go/Agents';
import { H1, Span } from '../atoms/Core';
import { Icon } from '../atoms/Themed';
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
              <>
                <tr key={agent.id}>
                  <td>{agent.address}</td>
                  <td>{agent.label}</td>
                  <td>
                    {
                      agent.online ?
                        <span>
                          <Icon icon={["fas", "check"]} style={{ marginRight: "0.2rem" }} />
                          {t("status.online")}
                        </span> :
                        <span>
                          <Icon icon={["fas", "times"]} style={{ marginRight: "0.2rem" }} />
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
              </>
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