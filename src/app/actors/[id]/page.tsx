'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import type { Actor } from '@/types/movie'

export default function ActorProfile({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [actor, setActor] = useState<Actor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const data = await api.getActor(parseInt(params.id))
        setActor(data)
      } catch (error) {
        console.error('Error fetching actor:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchActor()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!actor) {
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
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">🎭</span>
            <div>
              <h1 className="text-4xl font-bold text-white">{actor.name}</h1>
              {actor.birth_year && (
                <p className="text-gray-400 text-lg">Born: {actor.birth_year}</p>
              )}
            </div>
          </div>
          {actor.bio && (
            <p className="text-gray-300 leading-relaxed mt-4">{actor.bio}</p>
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
