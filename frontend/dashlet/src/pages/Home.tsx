import React from 'react';
import ThemeSwitcher from '../components/themes/ThemeSwitcher';
import { H1 } from '../components/elements/Core';
import { AgentContext } from '../components/agents/AgentProvider';
import { AgentStatus } from '../components/agents/AgentStatus';
import { Board } from '../components/elements/Board';

const Home: React.FC = () => {
  // const agentContext = React.useContext(AgentContext);
  // const agents = agentContext.agents;

  return (
    <Board>
      <H1># Welcome to Dashlet.</H1>
      <ThemeSwitcher />
      <AgentStatus />
    </Board>
  );
};

export default Home;