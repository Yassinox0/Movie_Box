import { useState } from 'react';
import { Movie } from '../../types/movie';
import { PlayIcon, HeartIcon, ShareIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface MovieActionsProps {
  movie: Movie;
  onPlayClick: () => void;
}

export default function MovieActions({ movie, onPlayClick }: MovieActionsProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: movie.title,
        text: movie.overview,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-800 rounded-lg">
      <button
        onClick={onPlayClick}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        <PlayIcon className="h-5 w-5" />
        <span>Play</span>
      </button>

      <button
        onClick={() => setIsSaved(!isSaved)}
        className="p-3 hover:bg-gray-700 rounded-lg transition-colors"
      >
        {isSaved ? (
          <HeartSolidIcon className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5" />
        )}
      </button>

      <button
        onClick={handleShare}
        className="p-3 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <ShareIcon className="h-5 w-5" />
      </button>

      <button className="p-3 hover:bg-gray-700 rounded-lg transition-colors">
        <InformationCircleIcon className="h-5 w-5" />
      </button>

      {movie.watch_providers?.results?.US && (
        <div className="flex items-center gap-2 ml-auto">
          {movie.watch_providers.results.US.flatrate?.map((provider) => (
            <img
              key={provider.provider_id}
              src={getImageUrl(provider.logo_path, 'w92')}
              alt={provider.provider_name}
              className="h-8 w-8 rounded"
              title={provider.provider_name}
            />
          ))}
        </div>
      )}
    </div>
  );
}