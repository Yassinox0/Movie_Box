const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string, size: string = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export async function fetchMovieDetails(movieId: number) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,watch/providers`
    );
    if (!response.ok) throw new Error('Failed to fetch movie details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

// Rest of the existing API functions...