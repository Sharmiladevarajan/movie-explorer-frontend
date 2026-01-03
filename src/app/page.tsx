'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { HorizontalMovieScroll } from '@/components/HorizontalMovieScroll'
import { MovieForm } from '@/components/MovieForm'
import { HeroSection } from '@/components/HeroSection'
import { SearchSection } from '@/components/SearchSection'
import { CategoriesSection } from '@/components/CategoriesSection'
import { SearchBar } from '@/components/SearchBar'
import { MovieProvider, useMovie } from '@/contexts/MovieContext'
import { useGetMoviesQuery, useLazySearchMoviesQuery, useDeleteMovieMutation } from '@/store/api/moviesApi'
import type { Movie } from '@/types/movie'

interface Category {
  genre_id: number | string
  genre_name: string
  genre_description: string | null
  movie_count: number
  movies: Movie[]
}
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal'

const heroQuotes = [
  { quote: "Here's looking at you, kid.", movie: "Casablanca" },
  { quote: "May the Force be with you.", movie: "Star Wars" },
  { quote: "I'm going to make him an offer he can't refuse.", movie: "The Godfather" },
  { quote: "Why so serious?", movie: "The Dark Knight" },
]

function HomeContent() {
  const { isAdmin, setIsAdmin, editingMovie, setEditingMovie, showForm, setShowForm, handleEdit } = useMovie()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentQuote, setCurrentQuote] = useState(0)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null)

  // RTK Query hooks
  const { data: moviesData, isLoading, isError, refetch } = useGetMoviesQuery({ limit_per_genre: 10 })
  const [searchMovies, { data: searchData, isLoading: isSearching }] = useLazySearchMoviesQuery()
  const [deleteMovie, { isLoading: isDeleting }] = useDeleteMovieMutation()

  const categories = moviesData?.categories || []

  const fetchCategories = useCallback(() => {
    refetch()
  }, [refetch])

  const handleSearch = useCallback(async (term: string) => {
    setSearchTerm(term)
    
    if (!term.trim()) {
      return
    }
    
    try {
      await searchMovies(term).unwrap()
    } catch (error) {
      console.error('Error searching movies:', error)
    }
  }, [searchMovies])

  // Group search results by genre
  const searchResultsByGenre = useMemo(() => {
    const searchResults: Movie[] = searchData?.movies || []
    if (!searchResults.length) return []
    
    const grouped = searchResults.reduce((acc: { [key: string]: Movie[] }, movie: Movie) => {
      const genre = (movie as any).genre || 'Unknown'
      if (!acc[genre]) acc[genre] = []
      acc[genre].push(movie)
      return acc
    }, {} as { [key: string]: Movie[] })
    
    return Object.entries(grouped).map(([genre_name, movies]) => ({
      genre_name,
      movies: movies as Movie[],
    }))
  }, [searchData])

  const handleDelete = useCallback((movie: Movie) => {
    setMovieToDelete(movie)
    setDeleteModalOpen(true)
  }, [])

  const confirmDelete = useCallback(async () => {
    if (!movieToDelete) return
    
    try {
      await deleteMovie(movieToDelete.id).unwrap()
      setDeleteModalOpen(false)
      setMovieToDelete(null)
      
      // Refresh search results if we're in search mode
      if (searchTerm) {
        await searchMovies(searchTerm)
      }
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }, [movieToDelete, deleteMovie, searchTerm, searchMovies])

  const handleFormSuccess = useCallback(() => {
    setShowForm(false)
    setEditingMovie(null)
    
    // Refresh data
    refetch()
    if (searchTerm) {
      searchMovies(searchTerm)
    }
  }, [setShowForm, setEditingMovie, refetch, searchTerm, searchMovies])

  const handleFormCancel = useCallback(() => {
    setShowForm(false)
    setEditingMovie(null)
  }, [setShowForm, setEditingMovie])

  const handleAddMovie = useCallback(() => {
    setEditingMovie(null)
    setShowForm(true)
  }, [setEditingMovie, setShowForm])

  // Filter categories to show only those with movies (no merging)
  const displayCategories = useMemo(() => {
    return categories.filter((cat: Category) => cat.movies && cat.movies.length > 0)
  }, [categories])

  // Determine if we're showing search results
  const isSearchMode = searchTerm.trim().length > 0

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % heroQuotes.length)
    }, 5000)
    return () => clearInterval(quoteInterval)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-purple-900">
      {/* Profile Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <div className="glass-effect rounded-full p-2 border border-purple-500/30 hover:border-purple-500/50 transition-all">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all"
            title={isAdmin ? "Switch to User Mode" : "Switch to Admin Mode"}
          >
            <div className="relative">
              {isAdmin ? (
                <span className="text-2xl">👨‍💼</span>
              ) : (
                <span className="text-2xl">👤</span>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <span className="text-white font-semibold text-sm">
              {isAdmin ? 'Admin' : 'User'}
            </span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-cyan-900/40">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920')] bg-cover bg-center opacity-15"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
        <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center">
          <HeroSection currentQuote={currentQuote} heroQuotes={heroQuotes} />
          {isAdmin && (
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddMovie}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                🎬 Add New Movie
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 md:px-8 mb-4">
        <SearchSection
          searchTerm={searchTerm}
          onSearch={handleSearch}
          isSearching={isSearching}
          searchResultsByGenre={searchResultsByGenre}
        />
      </div>

     

      {/* Movie Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] glass-effect rounded-2xl border border-purple-500/30 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleFormCancel}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full glass-effect hover:bg-red-500/20 border border-purple-500/30 hover:border-red-500/50 transition-all"
              title="Close"
            >
              <span className="text-white text-2xl leading-none">×</span>
            </button>
            
            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh] p-6">
              <MovieForm
                movie={editingMovie}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto pb-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center gap-3 glass-effect px-8 py-4 rounded-full border border-purple-500/20">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white text-lg font-semibold">Loading movies...</span>
            </div>
          </div>
        ) : isSearchMode ? (
          /* Search Results */
          isSearching ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex items-center gap-3 glass-effect px-8 py-4 rounded-full border border-purple-500/20">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white text-lg font-semibold">Searching...</span>
              </div>
            </div>
          ) : (searchData?.movies || []).length > 0 ? (
            <div className="space-y-6">
              <div className="px-4 md:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Search Results for "{searchTerm}" ({(searchData?.movies || []).length} found)
                </h2>
              </div>
              
              {/* Display search results grouped by genre */}
              {searchResultsByGenre.map((group, index) => (
                <HorizontalMovieScroll
                  key={`search-${group.genre_name}-${index}`}
                  title={group.genre_name}
                  movies={group.movies}
                  isAdmin={isAdmin}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="glass-effect inline-block px-8 py-6 rounded-2xl border border-purple-500/20">
                <p className="text-gray-400 text-xl mb-2">No movies found for "{searchTerm}"</p>
                <p className="text-gray-500 text-sm">Try searching with different keywords</p>
              </div>
            </div>
          )
        ) : (
          /* Netflix-style Categories */
          <div className="space-y-6" key={`categories-${displayCategories.length}`}>
            {displayCategories.map((category) => (
              <HorizontalMovieScroll
                key={category.genre_id}
                title={category.genre_name}
                description={category.genre_description || undefined}
                movies={category.movies}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}

            {displayCategories.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <div className="glass-effect inline-block px-8 py-6 rounded-2xl border border-purple-500/20">
                  <p className="text-gray-400 text-xl mb-2">No movies available</p>
                  <p className="text-gray-500 text-sm">Add some movies to get started!</p>
                </div>
              </div>
            )}
            

          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setMovieToDelete(null)
        }}
        onConfirm={confirmDelete}
        movie={movieToDelete}
        isDeleting={isDeleting}
      />
    </main>
  )
}

export default function NetflixStyleHome() {
  return (
    <MovieProvider>
      <HomeContent />
    </MovieProvider>
  )
}
