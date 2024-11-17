import { useAuth } from '../contexts/AuthContext';
import MovieCard from '../components/MovieCard';

export default function Watchlist() {
  const { currentUser } = useAuth();

  // Placeholder watchlist data
  const watchlist = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      posterPath: "https://via.placeholder.com/300x450",
      rating: 9.3,
      releaseDate: "1994-09-23"
    },
    {
      id: 2,
      title: "The Godfather",
      posterPath: "https://via.placeholder.com/300x450",
      rating: 9.2,
      releaseDate: "1972-03-24"
    }
  ];

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your watchlist</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-white text-center">Your watchlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={movie.posterPath}
              rating={movie.rating}
              releaseDate={movie.releaseDate}
            />
          ))}
        </div>
      )}
    </div>
  );
}