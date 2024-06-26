import React, { Suspense } from 'react';
// import Board from './components/basements/Board';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

// Routing Template
import Home from './pages/Home';
import RoomSetup from './pages/RoomSetup';
import Agent from './pages/Agent';
import Controllers from './pages/Controllers';
import Controller from './pages/Controller';
import NewController from './pages/NewController';
import EditController from './pages/EditController';
import NotFound from './pages/NotFound';

// Custom themes
import { RoomProvider } from './components/basements/RoomProvider';
import { ThemeProvider } from './components/themes/ThemeProvider';
import './themes/bootstrap.min.css';
import './themes/ui.css';

const App: React.FC = () => {
  // Initialize Icons
  library.add(fab, fas, far);

  return (
    <Suspense fallback="">
      <ThemeProvider>
        <RoomProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              
              {/* Room */}
              <Route exact path="/room/setup" component={RoomSetup} />

              {/* Agent */}
              <Route exact path="/agent/" component={Agent} />

              {/* Controllers */}
              <Route exact path="/controllers" component={Controllers} />
              <Route exact path="/controllers/new" component={NewController} />

              {/* Reserved for Modal base controller */}
              {/* <Route exact path="/controllers/:id" component={Home} /> */}
              <Route exact path="/controllers/:id" component={Controller} />
              <Route exact path="/controllers/:id/edit" component={EditController} />

              <Route path='*' component={NotFound} />
            </Switch>
          </Router>
        </RoomProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;