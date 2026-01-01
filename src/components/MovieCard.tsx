import type { Movie } from '@/types/movie'

interface MovieCardProps {
  movie: Movie
  onEdit: (movie: Movie) => void
  onDelete: (id: number) => void
}

export function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex-1">{movie.title}</h3>
          {movie.rating && (
            <span className="ml-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-sm font-semibold">
              ⭐ {movie.rating}
            </span>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-gray-700">
            <span className="font-semibold">Director:</span> {movie.director}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Year:</span> {movie.release_year}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Genre:</span>{' '}
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {movie.genre}
            </span>
          </p>
        </div>

        {movie.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{movie.description}</p>
        )}

        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => onEdit(movie)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
