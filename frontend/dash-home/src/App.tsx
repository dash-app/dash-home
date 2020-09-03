import React from 'react';
// import Board from './components/basements/Board';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import styled from 'styled-components';
import { Helmet } from "react-helmet";

// Redux Store
import store from './store';

// Routing Template
import Home from './templates/Home';
import Settings from './templates/Settings';
import About from './templates/About';
import Controller from './templates/Controller';
import Sandbox from './templates/Sandbox';
import DemoAircon from './templates/DemoAircon';

// Custom themes
import './themes/bootstrap.min.css';
import './themes/ui.css';

const App: React.FC = () => {
  // Initialize Icons
  library.add(fab, fas, far);

  return (
    <Provider store={store}>
      <Router>
        <Helmet>
          <style>
            {
              `body { background-color: ${
              useSelector<any, string>((state) => state.themes.name) === "CHEEKY_WHITE" ? "#FFFFFF" : "#111115"
              }; }`
            }
          </style>
        </Helmet>
        <Contents>
          <Route exact path="/" render={() => <Home ctrl={""} />} />
          <Route path="/settings" component={Settings} />
          <Route path="/about" component={About} />

          {/* Controllers */}
          <Route path="/controllers/:id" component={Controller} />

          {/* Sandbox Page (Remove before Release!) */}
          <Route path="/sandbox" component={Sandbox} />

          {/* Component demo (AIRCON) */}
          <Route path="/demo/aircon" component={DemoAircon} />
        </Contents>
      </Router>
    </Provider>
  );
}

const Contents = styled.div`
`

export default App;
