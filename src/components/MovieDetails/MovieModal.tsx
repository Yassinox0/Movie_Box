import { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Movie } from '../../types/movie';
import { fetchMovieDetails } from '../../services/api';
import MovieHero from './MovieHero';
import MovieActions from './MovieActions';
import MovieCast from './MovieCast';

interface MovieModalProps {
  movieId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovieModal({ movieId, isOpen, onClose }: MovieModalProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && movieId) {
      const loadMovie = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await fetchMovieDetails(movieId);
          setMovie(data);
        } catch (error) {
          setError('Failed to load movie details');
        } finally {
          setLoading(false);
        }
      };
      loadMovie();
    }
  }, [movieId, isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/70" />

        <div className="relative bg-gray-900 w-full max-w-7xl mx-auto rounded-lg overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="h-96 flex items-center justify-center text-red-500">
              {error}
            </div>
          ) : movie ? (
            <div>
              <MovieHero movie={movie} />
              
              <div className="p-6">
                <MovieActions
                  movie={movie}
                  onPlayClick={() => {
                    // Handle play action
                  }}
                />

                <div className="mt-8">
                  <p className="text-lg leading-relaxed">{movie.overview}</p>
                </div>

                {movie.credits?.cast && <MovieCast cast={movie.credits.cast} />}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Dialog>
  );
}