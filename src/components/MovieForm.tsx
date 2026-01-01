import { useState, FormEvent } from 'react'
import { api } from '@/lib/api'
import type { Movie, MovieInput } from '@/types/movie'

interface MovieFormProps {
  movie?: Movie | null
  onSuccess: () => void
  onCancel: () => void
}

interface CastMember {
  actor_name: string
  role: string
}

export function MovieForm({ movie, onSuccess, onCancel }: MovieFormProps) {
  const [formData, setFormData] = useState<MovieInput>({
    title: movie?.title || '',
    director_name: movie?.director || '',
    release_year: movie?.release_year || new Date().getFullYear(),
    genre_name: movie?.genre || '',
    rating: movie?.rating || undefined,
    description: movie?.description || '',
    language: movie?.language || 'English',
    cast: movie?.cast?.map(c => ({ actor_name: c.name, role: c.role || '' })) || [],
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="glass-effect border-l-4 border-red-500 text-red-300 px-5 py-4 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
          <span className="text-lg">🎬</span> Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 glass-effect rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 text-white placeholder-gray-500 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
          <span className="text-lg">👤</span> Director *
        </label>
        <input
          type="text"
          required
          value={formData.director_name}
          onChange={(e) => setFormData({ ...formData, director_name: e.target.value })}
          className="w-full px-4 py-3 glass-effect rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 text-white placeholder-gray-500 transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
            <span className="text-lg">📅</span> Release Year *
          </label>
          <input
            type="number"
            required
            min="1888"
            max="2030"
            value={formData.release_year}
            onChange={(e) => setFormData({ ...formData, release_year: parseInt(e.target.value) })}
            className="w-full px-4 py-3 glass-effect rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 text-white placeholder-gray-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
            <span className="text-lg">★</span> Rating (0-10)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={formData.rating || ''}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full px-4 py-3 glass-effect rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 text-white placeholder-gray-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
          <span className="text-lg">🎭</span> Genre *
        </label>
        <input
          type="text"
          required
          value={formData.genre_name}
          onChange={(e) => setFormData({ ...formData, genre_name: e.target.value })}
          className="w-full px-4 py-3 glass-effect rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 text-white placeholder-gray-500 transition-all"
          placeholder="Action, Drama, Comedy, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
          <span className="text-lg">🌐</span> Language
        </label>
        <select
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          className="w-full px-4 py-3 glass-effect rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 text-white placeholder-gray-500 transition-all"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Korean">Korean</option>
          <option value="Chinese">Chinese</option>
          <option value="Hindi">Hindi</option>
          <option value="Arabic">Arabic</option>
          <option value="Russian">Russian</option>
          <option value="Portuguese">Portuguese</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
          <span className="text-lg">📝</span> Description
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 glass-effect rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 text-white placeholder-gray-500 transition-all resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
          <span className="text-lg">🎭</span> Cast Members
        </label>
        <div className="space-y-3">
          {(formData.cast || []).map((member, index) => (
            <div key={index} className="flex gap-2 items-start">
              <input
                type="text"
                placeholder="Actor name"
                value={member.actor_name}
                onChange={(e) => {
                  const newCast = [...(formData.cast || [])]
                  newCast[index] = { ...newCast[index], actor_name: e.target.value }
                  setFormData({ ...formData, cast: newCast })
                }}
                className="flex-1 px-4 py-2 glass-effect rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 text-white placeholder-gray-500 transition-all"
              />
              <input
                type="text"
                placeholder="Role/Character"
                value={member.role}
                onChange={(e) => {
                  const newCast = [...(formData.cast || [])]
                  newCast[index] = { ...newCast[index], role: e.target.value }
                  setFormData({ ...formData, cast: newCast })
                }}
                className="flex-1 px-4 py-2 glass-effect rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 text-white placeholder-gray-500 transition-all"
              />
              <button
                type="button"
                onClick={() => {
                  const newCast = (formData.cast || []).filter((_, i) => i !== index)
                  setFormData({ ...formData, cast: newCast })
                }}
                className="px-3 py-2 glass-effect hover:bg-red-500/20 text-red-400 rounded-lg transition-all border border-red-500/30 hover:border-red-500/50"
              >
                🗑️
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData({ 
                ...formData, 
                cast: [...(formData.cast || []), { actor_name: '', role: '' }]
              })
            }}
            className="w-full px-4 py-2 glass-effect hover:bg-purple-500/20 text-purple-300 rounded-lg transition-all border border-purple-500/30 hover:border-purple-500/50 font-semibold"
          >
            ➕ Add Cast Member
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-600 disabled:text-gray-400 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-purple-500/50 disabled:shadow-none"
        >
          {loading ? '⏳ Saving...' : movie ? '✓ Update Movie' : '✓ Add Movie'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 glass-effect hover:bg-white/10 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50"
        >
          ✕ Cancel
        </button>
      </div>
    </form>
  )
}
