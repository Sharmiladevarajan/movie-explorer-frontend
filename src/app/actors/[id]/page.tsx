'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useGetActorQuery } from '@/store/api/moviesApi'

export default function ActorProfile({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: actor, isLoading, isError } = useGetActorQuery(parseInt(params.id))

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (isError || !actor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Actor not found</div>
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

        {/* Actor Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
            {/* Actor Photo */}
            <div className="flex-shrink-0">
              {actor.image_url && actor.image_url !== 'N/A' ? (
                <Image
                  src={actor.image_url}
                  alt={actor.name}
                  width={160}
                  height={160}
                  unoptimized={actor.image_url.includes('media-amazon.com')}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-500/50 shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center border-4 border-purple-500/50 shadow-xl">
                  <span className="text-4xl md:text-5xl">🎭</span>
                </div>
              )}
            </div>
            
            {/* Actor Info */}
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{actor.name}</h1>
              {actor.birth_year && (
                <p className="text-gray-400 text-lg mb-2">📅 Born: {actor.birth_year}</p>
              )}
              {actor.movie_count && (
                <p className="text-purple-400 text-lg">🎬 {actor.movie_count} movies</p>
              )}
            </div>
          </div>
          {actor.bio && (
            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <h3 className="text-white font-semibold mb-2">Biography</h3>
              <p className="text-gray-300 leading-relaxed">{actor.bio}</p>
            </div>
          )}
        </div>

        {/* Filmography */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            🎬 Filmography {actor.movie_count ? `(${actor.movie_count} movies)` : ''}
          </h2>
          {actor.movies && actor.movies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {actor.movies.map((movie) => (
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
                  {(movie as any).role && (
                    <p className="text-purple-400 text-sm mt-1">as {(movie as any).role}</p>
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
