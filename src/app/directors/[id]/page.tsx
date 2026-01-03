'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useGetDirectorQuery } from '@/store/api/moviesApi'

export default function DirectorProfile({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: director, isLoading, isError } = useGetDirectorQuery(parseInt(params.id))

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (isError || !director) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Director not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          ← Back
        </button>

        {/* Director Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
            {/* Director Photo */}
            <div className="flex-shrink-0">
              {director.image_url ? (
                <Image
                  src={director.image_url}
                  alt={director.name}
                  width={160}
                  height={160}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500/50 shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center border-4 border-blue-500/50 shadow-xl">
                  <span className="text-4xl md:text-5xl">🎬</span>
                </div>
              )}
            </div>
            
            {/* Director Info */}
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{director.name}</h1>
              {director.birth_year && (
                <p className="text-gray-400 text-lg mb-2">📅 Born: {director.birth_year}</p>
              )}
              {director.movie_count && (
                <p className="text-blue-400 text-lg">🎬 {director.movie_count} films directed</p>
              )}
            </div>
          </div>
          {director.bio && (
            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <h3 className="text-white font-semibold mb-2">Biography</h3>
              <p className="text-gray-300 leading-relaxed">{director.bio}</p>
            </div>
          )}
        </div>

        {/* Filmography */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            🎬 Directed Films {director.movie_count ? `(${director.movie_count} movies)` : ''}
          </h2>
          {director.movies && director.movies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {director.movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors cursor-pointer"
                  onClick={() => router.push(`/movies/${movie.id}`)}
                >
                  <h3 className="text-white font-semibold mb-2">{movie.title}</h3>
                  <p className="text-gray-400 text-sm">📅 {movie.release_year}</p>
                  <p className="text-gray-400 text-sm">🎬 {movie.genre}</p>
                  {movie.rating && (
                    <p className="text-yellow-400 text-sm">⭐ {movie.rating}/10</p>
                  )}
                  {movie.description && (
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{movie.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
