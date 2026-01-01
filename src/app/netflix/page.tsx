'use client'

import { useState, useEffect } from 'react'
import { HorizontalMovieScroll } from '@/components/HorizontalMovieScroll'
import { MovieForm } from '@/components/MovieForm'
import { SearchBar } from '@/components/SearchBar'
import { api } from '@/lib/api'
import type { Movie } from '@/types/movie'

interface Category {
  genre_id: number
  genre_name: string
  genre_description: string | null
  movie_count: number
  movies: Movie[]
}

const heroQuotes = [
  { quote: "Here's looking at you, kid.", movie: "Casablanca" },
  { quote: "May the Force be with you.", movie: "Star Wars" },
  { quote: "I'm going to make him an offer he can't refuse.", movie: "The Godfather" },
  { quote: "Why so serious?", movie: "The Dark Knight" },
]

export default function NetflixStyleHome() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [currentQuote, setCurrentQuote] = useState(0)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await api.getMoviesGroupedByGenre(10)
      setCategories(data.categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (term: string) => {
    setSearchTerm(term)
    if (!term.trim()) {
      setSearchResults([])
      return
    }
    
    try {
      const data = await api.searchMovies(term)
      setSearchResults(data.movies)
    } catch (error) {
      console.error('Error searching movies:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this movie?')) return
    
    try {
      await api.deleteMovie(id)
      fetchCategories()
      if (searchTerm) {
        handleSearch(searchTerm)
      }
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingMovie(null)
    fetchCategories()
    if (searchTerm) {
      handleSearch(searchTerm)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingMovie(null)
  }

  useEffect(() => {
    fetchCategories()
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % heroQuotes.length)
    }, 5000)
    return () => clearInterval(quoteInterval)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-purple-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-cyan-900/40">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920')] bg-cover bg-center opacity-15"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
        
        <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center">
          <div className="max-w-3xl space-y-6 animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Discover Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Favorite Movie
              </span>
            </h1>
            
            <div className="glass-effect p-4 rounded-lg border border-purple-500/20 max-w-lg">
              <p className="text-gray-300 text-lg italic">"{heroQuotes[currentQuote].quote}"</p>
              <p className="text-purple-400 text-sm mt-1">— {heroQuotes[currentQuote].movie}</p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => {
                  setEditingMovie(null)
                  setShowForm(true)
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                🎬 Add New Movie
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Movie Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl my-8">
            <MovieForm
              movie={editingMovie}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto pb-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center gap-3 glass-effect px-8 py-4 rounded-full border border-purple-500/20">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white text-lg font-semibold">Loading movies...</span>
            </div>
          </div>
        ) : searchTerm && searchResults.length > 0 ? (
          /* Search Results */
          <div className="px-4 md:px-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Search Results for "{searchTerm}"
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((movie) => (
                <div key={movie.id} className="opacity-0 animate-fadeIn">
                  <div
                    onClick={() => window.location.href = `/movies/${movie.id}`}
                    className="cursor-pointer group transition-transform duration-300 hover:scale-105"
                  >
                    <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-cyan-900/30 border border-purple-500/20 hover:border-cyan-500/50 transition-all">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                      
                      {movie.rating && (
                        <div className="absolute top-3 right-3 glass-effect px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-yellow-400/30">
                          <span className="text-yellow-400">★</span>
                          <span className="text-white font-bold text-sm">{movie.rating}</span>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                        <h3 className="text-white font-bold text-lg line-clamp-2">{movie.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span>{movie.release_year}</span>
                          <span>•</span>
                          <span>{movie.genre}</span>
                        </div>
                        <p className="text-gray-400 text-xs">Director: {movie.director}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : searchTerm && searchResults.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No movies found for "{searchTerm}"</p>
          </div>
        ) : (
          /* Netflix-style Categories */
          <div className="space-y-12">
            {categories.map((category) => (
              <HorizontalMovieScroll
                key={category.genre_id}
                title={category.genre_name}
                description={category.genre_description || undefined}
                movies={category.movies}
              />
            ))}

            {categories.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">No movies available. Add some movies to get started!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
