import { Movie } from '../../types/movie';
import { getImageUrl } from '../../services/api';
import { StarIcon, ClockIcon } from '@heroicons/react/24/solid';

interface MovieHeroProps {
  movie: Movie;
}

export default function MovieHero({ movie }: MovieHeroProps) {
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path || '', 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
        
        {movie.tagline && (
          <p className="text-xl text-gray-300 mb-4 italic">{movie.tagline}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base mb-6">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          {movie.runtime && (
            <span className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {formatRuntime(movie.runtime)}
            </span>
          )}
          <div className="flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
            <span className="text-gray-400">({movie.vote_count} votes)</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-gray-800 rounded-full text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}