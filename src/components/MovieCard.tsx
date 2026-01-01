import type { Movie } from '@/types/movie'
import { useRouter } from 'next/navigation'

interface MovieCardProps {
  movie: Movie
  onEdit: (movie: Movie) => void
  onDelete: (id: number) => void
}

export function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  const router = useRouter()

  return (
    <div className="group relative glass-effect rounded-2xl overflow-hidden border border-purple-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
      {/* Movie Poster Placeholder - clickable */}
      <div 
        className="relative h-56 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-cyan-900/30 overflow-hidden cursor-pointer"
        onClick={() => router.push(`/movies/${movie.id}`)}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A24] via-transparent to-transparent"></div>
        
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-cyan-600/0 group-hover:from-purple-600/20 group-hover:to-cyan-600/20 transition-all duration-500"></div>
        
        {/* Rating Badge */}
        {movie.rating && (
          <div className="absolute top-3 right-3 glass-effect px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-yellow-400/30 backdrop-blur-xl">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-white font-bold text-sm">{movie.rating}</span>
          </div>
        )}
        
        {/* Genre Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            {movie.genre}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Title - clickable */}
        <h3 
          onClick={() => router.push(`/movies/${movie.id}`)}
          className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300 line-clamp-2 cursor-pointer"
        >
          {movie.title}
        </h3>
        
        {/* Info Section */}
        <div className="space-y-2.5 mb-4 text-sm">
          <div className="flex items-center gap-2.5 text-gray-300">
            <span className="text-purple-400 text-lg">🎬</span>
            <span className="font-semibold text-gray-400">Director:</span>
            <span className="text-white flex-1 truncate">{movie.director}</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-300">
            <span className="text-cyan-400 text-lg">📅</span>
            <span className="font-semibold text-gray-400">Year:</span>
            <span className="text-white">{movie.release_year}</span>
          </div>
        </div>

        {/* Description */}
        {movie.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {movie.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-purple-500/20">
          <button
            onClick={() => onEdit(movie)}
            className="flex-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 hover:from-purple-600/40 hover:to-cyan-600/40 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 border border-purple-500/30 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-purple-500/30"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="flex-1 bg-red-500/10 hover:bg-red-500/30 text-red-400 hover:text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 border border-red-500/30 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/30"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  )
}
