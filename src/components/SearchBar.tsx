import { useState, useEffect, useCallback } from 'react'

interface SearchBarProps {
  onSearch: (term: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Debounced search on change
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  const handleClear = useCallback(() => {
    setSearchTerm('')
    // Immediately trigger search on clear without waiting for debounce
    onSearch('')
  }, [onSearch])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors text-xl">
            🔍
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search movies by title, director, or description..."
            className="w-full pl-12 pr-4 py-4 glass-effect rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-500 transition-all duration-300"
          />
        </div>
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
    </div>
  )
}

