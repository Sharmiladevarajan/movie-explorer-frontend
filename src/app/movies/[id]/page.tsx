'use client'

import { useRouter } from 'next/navigation'
import { useGetMovieQuery } from '@/store/api/moviesApi'

export default function MovieDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: movie, isLoading, isError } = useGetMovieQuery(parseInt(params.id))

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Movie not found</div>
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
          ← Back to Movies
        </button>

        {/* Movie Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-300">
            <span className="text-xl">📅 {movie.release_year}</span>
            <span className="text-xl">🎬 {movie.genre}</span>
            {movie.rating && (
              <span className="text-xl">⭐ {movie.rating}/10</span>
            )}
          </div>
        </div>

        {/* Movie Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Description */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">📖 Description</h2>
            <p className="text-gray-300 leading-relaxed">
              {movie.description || 'No description available.'}
            </p>
          </div>

          {/* Director Info */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🎬 Director</h2>
            <button
              onClick={() => movie.director_id && router.push(`/directors/${movie.director_id}`)}
              className="text-purple-400 hover:text-purple-300 text-xl transition-colors"
            >
              {movie.director}
            </button>
          </div>
        </div>

        {/* Cast */}
        {movie.cast && movie.cast.length > 0 && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">🎭 Cast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {movie.cast.map((actor) => (
                <div
                  key={actor.id}
                  className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors cursor-pointer"
                  onClick={() => router.push(`/actors/${actor.id}`)}
                >
                  <p className="text-white font-semibold">{actor.name}</p>
                  {actor.role && (
                    <p className="text-gray-400 text-sm">as {actor.role}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {movie.reviews && movie.reviews.length > 0 && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">⭐ Reviews ({movie.reviews.length})</h2>
            <div className="space-y-4">
              {movie.reviews.map((review) => (
                <div key={review.id} className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white font-semibold">{review.reviewer_name}</p>
                    <span className="text-yellow-400">⭐ {review.rating}/10</span>
                  </div>
                  {review.comment && (
                    <p className="text-gray-300">{review.comment}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
