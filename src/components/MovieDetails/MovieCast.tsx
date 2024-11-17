import { CastMember } from '../../types/movie';
import { getImageUrl } from '../../services/api';

interface MovieCastProps {
  cast: CastMember[];
}

export default function MovieCast({ cast }: MovieCastProps) {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {cast.slice(0, 10).map((member) => (
            <div
              key={member.id}
              className="flex-shrink-0 w-32 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-2">
                <img
                  src={getImageUrl(member.profile_path || '', 'w185')}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="font-medium text-sm">{member.name}</p>
              <p className="text-sm text-gray-400">{member.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}