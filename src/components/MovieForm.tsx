import { useState, FormEvent } from 'react'
import { api } from '@/lib/api'
import type { Movie, MovieInput } from '@/types/movie'

interface MovieFormProps {
  movie?: Movie | null
  onSuccess: () => void
  onCancel: () => void
}

export function MovieForm({ movie, onSuccess, onCancel }: MovieFormProps) {
  const [formData, setFormData] = useState<MovieInput>({
    title: movie?.title || '',
    director_name: movie?.director || '',
    release_year: movie?.release_year || new Date().getFullYear(),
    genre_name: movie?.genre || '',
    rating: movie?.rating || undefined,
    description: movie?.description || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (movie?.id) {
        await api.updateMovie(movie.id, formData)
      } else {
        await api.createMovie(formData)
      }
      onSuccess()
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Director *
        </label>
        <input
          type="text"
          required
          value={formData.director_name}
          onChange={(e) => setFormData({ ...formData, director_name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Release Year *
          </label>
          <input
            type="number"
            required
            min="1888"
            max="2030"
            value={formData.release_year}
            onChange={(e) => setFormData({ ...formData, release_year: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating (0-10)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={formData.rating || ''}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Genre *
        </label>
        <input
          type="text"
          required
          value={formData.genre_name}
          onChange={(e) => setFormData({ ...formData, genre_name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Action, Drama, Comedy, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          {loading ? 'Saving...' : movie ? 'Update Movie' : 'Add Movie'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
