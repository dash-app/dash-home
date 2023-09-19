import React from 'react';
import { AgentsResult, fetchAgents } from '../../clients/Agent';

interface Props {
  children: React.ReactNode,
}

interface Context {
  agents?: AgentsResult,
  fetchAgents: (setter: React.Dispatch<React.SetStateAction<AgentsResult | undefined>>) => void,
}

export const AgentContext = React.createContext<Context>({
  agents: undefined,
  fetchAgents: () => null,
});

export const AgentProvider: React.FC<Props> = (props) => {
  const fetch = (
    setter: React.Dispatch<React.SetStateAction<AgentsResult | undefined>>
  ) => {
    console.info('*** fetch invoking...');
    fetchAgents(setter);
  };

  const [agents, setAgents] = React.useState<AgentsResult | undefined>(
    undefined
  );
  React.useEffect(() => {
    fetch(setAgents);
  }, []);

  return (
    <AgentContext.Provider value={{ agents, fetchAgents }}>
      {props.children}
    </AgentContext.Provider>
  );
};
