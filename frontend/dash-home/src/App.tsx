import React from 'react';
// import Board from './components/basements/Board';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { Helmet } from "react-helmet";

// Routing Template
import Home from './pages/Home';
import Settings from './pages/Settings';
import About from './pages/About';
import Controllers from './pages/Controllers';
import Controller from './pages/Controller';
import Sandbox from './pages/Sandbox';
import DemoAircon from './pages/DemoAircon';

// Custom themes
import ThemeContext from './components/themes/Theme';
import './themes/bootstrap.min.css';
import './themes/ui.css';

const App: React.FC = () => {
  const theme = useSelector<any, string>((state) => state.themes.name)

  // Initialize Icons
  library.add(fab, fas, far);

  return (
    <ThemeContext.Provider value={theme}>
      <Router>
        <Helmet>
          <style>
            {
              `body { background-color: ${theme === "CHEEKY_WHITE" ? "#FFFFFF" : "#111115"}; }`
            }
          </style>
        </Helmet>
        <Route exact path="/" render={() => <Home ctrl={""} />} />
        <Route path="/settings" component={Settings} />
        <Route path="/about" component={About} />

        {/* Controllers */}
        <Route exact path="/controllers" component={Controllers} />
        <Route path="/controllers/:id" component={Controller} />

        {/* Sandbox Page (Remove before Release!) */}
        <Route path="/sandbox" component={Sandbox} />

        {/* Component demo (AIRCON) */}
        <Route path="/demo/aircon" component={DemoAircon} />
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;