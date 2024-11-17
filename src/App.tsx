import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Watchlist from './pages/Watchlist';
import Search from './pages/Search';
import ForgotPassword from './pages/ForgotPassword';
import PhoneVerification from './pages/PhoneVerification';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/search" element={<Search />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/phone-verification" element={<PhoneVerification />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}