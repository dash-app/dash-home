import * as React from 'react';
// import Board from './components/basements/Board';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import styled from 'styled-components';

// Routing Template
import Home from './templates/Home';
import Settings from './templates/Settings';
import About from './templates/About';
import Sandbox from './templates/Sandbox';
import DemoAircon from './templates/DemoAircon';

// Custom themes
import { Container } from 'react-bootstrap';
import './themes/bootstrap.min.css';
import './themes/ui.css';

// UI Components./components/navbar/Navigation
import Navigation from './components/navbar/Navigation';

const App: React.FC = () => {
  // Initialize Icons
  library.add(fab, fas, far);

  return (
    <Router>
      <Navigation />
      <Container fluid>
        <Contents>
          <Route exact path="/" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/about" component={About} />

          {/* Sandbox Page (Remove before Release!) */}
          <Route path="/sandbox" component={Sandbox} />

          {/* Component demo (AIRCON) */}
          <Route path="/demo/aircon" component={DemoAircon} />

        </Contents>
      </Container>
    </Router>
  );
}

const Contents = styled.div`
  padding-left: 4em;
  padding-right: 4em;
`

export default App;
