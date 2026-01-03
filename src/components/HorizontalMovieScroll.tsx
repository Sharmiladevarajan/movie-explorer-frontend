'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Movie } from '@/types/movie'

interface HorizontalMovieScrollProps {
  title: string
  movies: Movie[]
  description?: string
  isAdmin?: boolean
  onEdit?: (movie: Movie) => void
  onDelete?: (movie: Movie) => void
}

export function 
HorizontalMovieScroll({ 
  title, 
  movies, 
  description, 
  isAdmin = false,
  onEdit,
  onDelete 
}: HorizontalMovieScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  useEffect(() => {
    checkScroll()
    const handleResize = () => checkScroll()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [movies, checkScroll])

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 252 // 240px width + 12px gap
      const visibleCards = Math.floor(scrollRef.current.clientWidth / cardWidth)
      const scrollAmount = cardWidth * Math.max(visibleCards, 1)
      
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
      
      setTimeout(checkScroll, 300)
    }
  }, [checkScroll])

  const handleCardClick = useCallback((movie: Movie, e: React.MouseEvent) => {
    // Prevent navigation if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    router.push(`/movies/${movie.id}`)
  }, [router])

  const handleEdit = useCallback((e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation()
    if (onEdit) onEdit(movie)
  }, [onEdit])

  const handleDelete = useCallback((e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation()
    if (onDelete) {
      onDelete(movie)
    }
  }, [onDelete])

  if (movies.length === 0) return null

  // Show horizontal scroll for any number of movies
  const showArrows = movies.length > 3


  return (
    <div className="mb-6">
      {/* Category Header */}
      <div className="mb-3 px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{title}</h2>
        {description && (
          <p className="text-gray-400 text-xs">{description}</p>
        )}
      </div>

      {/* Scroll Container */}
      <div className="relative group">
        {/* Left Scroll Button - Only show if can scroll left and has arrows */}
        {showArrows && canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 md:w-16 bg-gradient-to-r from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:from-slate-900/90"
            aria-label="Scroll left"
          >
            <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center border border-purple-500/30 hover:border-purple-500/50 hover:scale-110 transition-all">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        {/* Movie Cards Scroll */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-8 py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={(e) => handleCardClick(movie, e)}
              className="flex-none w-60 cursor-pointer group/card"
            >
              {/* Movie Card */}
              <div className="relative h-80 rounded-lg overflow-hidden bg-slate-900/90 border border-purple-500/20 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:z-10">
                {/* Poster Background */}
                {movie.image_url ? (
                  <>
                    <img 
                      src={movie.image_url} 
                      alt={movie.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/card:scale-110 transition-all duration-500"
                      onLoad={(e) => {
                        // Fade in smoothly once loaded
                        e.currentTarget.style.opacity = '0.9';
                      }}
                      onError={(e) => {
                        // Fallback to default background if image fails to load
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement?.parentElement;
                        if (parent) {
                          parent.style.background = 'linear-gradient(135deg, rgba(109, 40, 217, 0.3), rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3))';
                        }
                      }}
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-cyan-900/30"></div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                {/* Rating Badge */}
                {movie.rating && (
                  <div className="absolute top-2 right-2 glass-effect px-2 py-1 rounded-full flex items-center gap-1 border border-yellow-400/30">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-white font-bold text-xs">{movie.rating}</span>
                  </div>
                )}

                {/* Admin Actions */}
                {isAdmin && (
                  <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleEdit(e, movie)}
                      className="w-8 h-8 glass-effect rounded-full flex items-center justify-center border border-blue-500/30 hover:border-blue-500/70 hover:bg-blue-500/20 transition-all"
                      title="Edit"
                    >
                      <span className="text-blue-400 text-sm">✏️</span>
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, movie)}
                      className="w-8 h-8 glass-effect rounded-full flex items-center justify-center border border-red-500/30 hover:border-red-500/70 hover:bg-red-500/20 transition-all"
                      title="Delete"
                    >
                      <span className="text-red-400 text-sm">🗑️</span>
                    </button>
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                  <h3 className="text-white font-bold text-base line-clamp-2 group-hover/card:text-cyan-400 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <span>{movie.release_year}</span>
                    <span>•</span>
                    <span className="truncate">{movie.genre}</span>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-1">
                    {movie.director}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Button - Only show if can scroll right and has arrows */}
        {showArrows && canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 md:w-16 bg-gradient-to-l from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:from-slate-900/90"
            aria-label="Scroll right"
          >
            <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center border border-purple-500/30 hover:border-purple-500/50 hover:scale-110 transition-all">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
