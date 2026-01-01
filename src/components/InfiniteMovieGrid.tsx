'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MovieCard } from './MovieCard'
import type { Movie } from '@/types/movie'
import { api } from '@/lib/api'

interface InfiniteMovieGridProps {
  genreName: string
  onEdit: (movie: Movie) => void
  onDelete: (id: number) => void
}

export function InfiniteMovieGrid({ genreName, onEdit, onDelete }: InfiniteMovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const observerTarget = useRef<HTMLDivElement>(null)

  const LIMIT = 20

  const loadMoreMovies = useCallback(async () => {
    if (loading || !hasMore) return

    try {
      setLoading(true)
      const data = await api.getMoviesByGenrePaginated(genreName, LIMIT, offset)
      
      setMovies(prev => [...prev, ...data.movies])
      setHasMore(data.has_more)
      setOffset(prev => prev + LIMIT)
    } catch (error) {
      console.error('Error loading movies:', error)
    } finally {
      setLoading(false)
    }
  }, [genreName, offset, loading, hasMore])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreMovies()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [loadMoreMovies, hasMore, loading])

  // Initial load
  useEffect(() => {
    setMovies([])
    setOffset(0)
    setHasMore(true)
    loadMoreMovies()
  }, [genreName])

  return (
    <div className="space-y-8">
      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-3 glass-effect px-6 py-3 rounded-full border border-purple-500/20">
            <div className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white font-semibold">Loading more movies...</span>
          </div>
        </div>
      )}

      {/* Intersection Observer Target */}
      <div ref={observerTarget} className="h-4" />

      {/* No More Movies */}
      {!hasMore && movies.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">You've reached the end of {genreName} movies</p>
        </div>
      )}

      {/* No Movies Found */}
      {!loading && movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No movies found in {genreName}</p>
        </div>
      )}
    </div>
  )
}
