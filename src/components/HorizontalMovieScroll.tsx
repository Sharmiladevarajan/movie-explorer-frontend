'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Movie } from '@/types/movie'

interface HorizontalMovieScrollProps {
  title: string
  movies: Movie[]
  description?: string
}

export function HorizontalMovieScroll({ title, movies, description }: HorizontalMovieScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (movies.length === 0) return null

  return (
    <div className="mb-12">
      {/* Category Header */}
      <div className="mb-4 px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{title}</h2>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
      </div>

      {/* Scroll Container */}
      <div className="relative group">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:from-slate-900/90"
          aria-label="Scroll left"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Movie Cards Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => router.push(`/movies/${movie.id}`)}
              className="flex-none w-64 cursor-pointer group/card transition-transform duration-300 hover:scale-105"
            >
              {/* Movie Card */}
              <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-cyan-900/30 border border-purple-500/20 hover:border-cyan-500/50 transition-all">
                {/* Poster Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400')] bg-cover bg-center opacity-20 group-hover/card:opacity-30 transition-opacity"></div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                {/* Rating Badge */}
                {movie.rating && (
                  <div className="absolute top-3 right-3 glass-effect px-2.5 py-1 rounded-full flex items-center gap-1 border border-yellow-400/30">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-white font-bold text-xs">{movie.rating}</span>
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                  <h3 className="text-white font-bold text-lg line-clamp-2 group-hover/card:text-cyan-400 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{movie.release_year}</span>
                    <span>•</span>
                    <span className="truncate">{movie.genre}</span>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2">
                    {movie.description || `Directed by ${movie.director}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:from-slate-900/90"
          aria-label="Scroll right"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
