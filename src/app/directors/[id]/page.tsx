'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import type { Director } from '@/types/movie'

export default function DirectorProfile({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [director, setDirector] = useState<Director | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDirector = async () => {
      try {
        const data = await api.getDirector(parseInt(params.id))
        setDirector(data)
      } catch (error) {
        console.error('Error fetching director:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDirector()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!director) {
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
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">🎬</span>
            <div>
              <h1 className="text-4xl font-bold text-white">{director.name}</h1>
              {director.birth_year && (
                <p className="text-gray-400 text-lg">Born: {director.birth_year}</p>
              )}
            </div>
          </div>
          {director.bio && (
            <p className="text-gray-300 leading-relaxed mt-4">{director.bio}</p>
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
