'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { Movie } from '@/types/movie'

interface MovieContextType {
  isAdmin: boolean
  setIsAdmin: (value: boolean) => void
  editingMovie: Movie | null
  setEditingMovie: (movie: Movie | null) => void
  showForm: boolean
  setShowForm: (value: boolean) => void
  handleEdit: (movie: Movie) => void
  handleDelete: (id: number, onDeleteCallback: () => Promise<void>) => Promise<void>
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export function MovieProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(true)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleEdit = useCallback((movie: Movie) => {
    setEditingMovie(movie)
    setShowForm(true)
  }, [])

  const handleDelete = useCallback(async (id: number, onDeleteCallback: () => Promise<void>) => {
    if (!confirm('Are you sure you want to delete this movie?')) return
    await onDeleteCallback()
  }, [])

  return (
    <MovieContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        editingMovie,
        setEditingMovie,
        showForm,
        setShowForm,
        handleEdit,
        handleDelete,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export function useMovie() {
  const context = useContext(MovieContext)
  if (context === undefined) {
    throw new Error('useMovie must be used within a MovieProvider')
  }
  return context
}
