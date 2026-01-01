'use client'

import { useState, useEffect } from 'react'
import { MovieCard } from '@/components/MovieCard'
import { MovieForm } from '@/components/MovieForm'
import { SearchBar } from '@/components/SearchBar'
import { api } from '@/lib/api'
import type { Movie } from '@/types/movie'

const movieQuotes = [
  { quote: "Here's looking at you, kid.", movie: "Casablanca" },
  { quote: "May the Force be with you.", movie: "Star Wars" },
  { quote: "I'm going to make him an offer he can't refuse.", movie: "The Godfather" },
  { quote: "Life is like a box of chocolates.", movie: "Forrest Gump" },
  { quote: "Why so serious?", movie: "The Dark Knight" },
  { quote: "I'll be back.", movie: "The Terminator" },
  { quote: "Just keep swimming.", movie: "Finding Nemo" },
  { quote: "To infinity and beyond!", movie: "Toy Story" },
]

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentQuote, setCurrentQuote] = useState(0)

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const data = await api.getMovies()
      setMovies(data.movies)
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (term: string) => {
    setSearchTerm(term)
    if (!term.trim()) {
      fetchMovies()
      return
    }
    
    try {
      setLoading(true)
      const data = await api.searchMovies(term)
      setMovies(data.movies)
    } catch (error) {
      console.error('Error searching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this movie?')) return
    
    try {
      await api.deleteMovie(id)
      fetchMovies()
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
    fetchMovies()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingMovie(null)
  }

  useEffect(() => {
    fetchMovies()
    // Rotate quotes every 5 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % movieQuotes.length)
    }, 5000)
    return () => clearInterval(quoteInterval)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[550px] mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920')] bg-cover bg-center opacity-10 animate-fadeIn"></div>
          {/* Animated orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]/30"></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
          <div className="animate-slideIn">
            <div className="mb-3">
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.3em] animate-glow">★ Premium Experience</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 text-shadow-lg leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Movies
              </span>
              <br />
              <span className="text-white">Explorer</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 text-shadow max-w-2xl leading-relaxed">
              Your personal cinema sanctuary • Curate & explore
            </p>
            
            {/* Quote Display with glass effect */}
            <div className="mb-8 animate-fadeIn glass-effect p-6 rounded-2xl max-w-2xl border-l-4 border-purple-500">
              <blockquote className="text-lg md:text-xl italic text-gray-100 text-shadow">
                &quot;{movieQuotes[currentQuote].quote}&quot;
              </blockquote>
              <p className="text-sm text-cyan-400 mt-3 font-medium">— {movieQuotes[currentQuote].movie}</p>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-500/50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-2xl">+</span> Add New Movie
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <SearchBar onSearch={handleSearch} />

        {showForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="glass-effect rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {editingMovie ? 'Edit Movie' : 'Add New Movie'}
              </h2>
              <MovieForm
                movie={editingMovie}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-opacity-75"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-500 border-opacity-50 absolute top-0 left-0" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
            </div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 animate-float">🎬</div>
            <p className="text-gray-400 text-xl">
              {searchTerm ? 'No movies found matching your search.' : 'No movies yet. Add your first movie!'}
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-purple-500 text-3xl">●</span>
              {searchTerm ? `Search Results for "${searchTerm}"` : 'Your Collection'}
              <span className="text-sm text-cyan-400 font-normal px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">({movies.length} {movies.length === 1 ? 'movie' : 'movies'})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MovieCard
                    movie={movie}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
