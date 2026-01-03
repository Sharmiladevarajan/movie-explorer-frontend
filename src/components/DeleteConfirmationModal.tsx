'use client'

import { useState, useEffect } from 'react'
import type { Movie } from '@/types/movie'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  movie: Movie | null
  isDeleting?: boolean
}

export function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  movie, 
  isDeleting = false 
}: DeleteConfirmationModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
      isOpen ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-red-500/20 p-8 max-w-md w-full transform transition-all duration-200 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
            <span className="text-red-400 text-2xl">⚠️</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Delete Movie</h3>
            <p className="text-gray-400 text-sm">This action cannot be undone</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="mb-8">
          <p className="text-gray-300 mb-4">
            Are you sure you want to delete this movie?
          </p>
          
          {movie && (
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
              <h4 className="text-white font-semibold">{movie.title}</h4>
              <p className="text-gray-400 text-sm">{movie.release_year} • {movie.genre}</p>
              {movie.director && (
                <p className="text-gray-400 text-sm">Directed by {movie.director}</p>
              )}
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-6 py-2.5 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete Movie'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}