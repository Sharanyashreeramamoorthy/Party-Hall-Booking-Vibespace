import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Halls from './pages/Halls';
import HallDetails from './pages/HallDetails';
import Poll from './pages/Poll';
import Booking from './pages/Booking';
import Availability from './pages/Availability';
import Compare from './pages/Compare';
import Recommendations from './pages/Recommendations';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/halls" element={<Halls />} />
            <Route path="/halls/:id" element={<HallDetails />} />
            <Route path="/poll/:id" element={<Poll />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <p>
            VibeSpace ✦ Every celebration deserves the perfect space.
          </p>
          <span>Find your vibe. Make memories.</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;