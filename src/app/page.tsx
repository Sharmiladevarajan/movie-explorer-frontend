'use client'

import { useState, useEffect } from 'react'
import { MovieCard } from '@/components/MovieCard'
import { MovieForm } from '@/components/MovieForm'
import { SearchBar } from '@/components/SearchBar'
import { api } from '@/lib/api'
import type { Movie } from '@/types/movie'

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

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
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Movies Explorer</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Add Movie
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'No movies found matching your search.' : 'No movies yet. Add your first movie!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
