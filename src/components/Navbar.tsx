import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { currentUser, signOut } = useAuth();

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">MovieFlix</Link>
        
        <div className="flex-1 mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/movies" className="hover:text-gray-300">Movies</Link>
          <Link to="/tv-shows" className="hover:text-gray-300">TV Shows</Link>
          {currentUser ? (
            <>
              <Link to="/watchlist" className="hover:text-gray-300">My Watchlist</Link>
              <button
                onClick={() => signOut()}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
}