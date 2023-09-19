import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Themes
import './themes/css/bootstrap.min.css';
import './themes/css/ui.css';
import { ThemeProvider } from './components/themes/ThemeProvider';

// Pages
import Home from './pages/Home';
import Room from './pages/Room';
import NotFound from './pages/NotFound';
import { AgentProvider } from './components/agents/AgentProvider';
import { RoomProvider } from './components/room/RoomProvider';

const App: React.FC = () => {
  return (
    <Suspense fallback={<h1>Plz wait</h1>}>
      <ThemeProvider>
        <AgentProvider>
          <RoomProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />

                {/* Room */}
                <Route path='/room' element={<Room />} />

                {/* Not Found */}
                <Route path='*' element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </RoomProvider>
        </AgentProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
