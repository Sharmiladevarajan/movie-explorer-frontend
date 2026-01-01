import { useState, FormEvent } from 'react'

interface SearchBarProps {
  onSearch: (term: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-12">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors text-xl">
            🔍
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies by title, director, or description..."
            className="w-full pl-12 pr-4 py-4 glass-effect rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-500 transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 whitespace-nowrap overflow-hidden"
        >
          <span className="relative z-10">🎬 Search</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="glass-effect hover:bg-white/10 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 whitespace-nowrap hover:shadow-lg hover:shadow-purple-500/20"
          >
            ✕ Clear
          </button>
        )}
      </div>
    </form>
  )
}
