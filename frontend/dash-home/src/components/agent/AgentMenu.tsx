import * as React from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Agent, AgentsResult, fetchAgents } from '../../remote-go/Agent';
import { H1, P, Span } from '../atoms/Core';
import { Icon } from '../atoms/Themed';

interface Props {

}

const AgentMenu: React.FC<Props> = props => {
  const { t } = useTranslation();

  const [agentsResult, setAgents] = React.useState<AgentsResult | undefined>(undefined);
  React.useEffect(() => {
    fetchAgents(setAgents);
  }, [])

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
                        <Icon icon={["fas", "check"]} style={{ marginRight: "0.2rem" }} />
                        {t("status.online")}
                      </span> :
                      <span>
                        <Icon icon={["fas", "times"]} style={{ marginRight: "0.2rem" }} />
                        {t("status.offline")}
                      </span>
                  }
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