interface FilterBarProps {
  onFilter: (filters: { genre?: string; director?: string; year?: number }) => void
  genres: string[]
  directors: string[]
}

export function FilterBar({ onFilter, genres, directors }: FilterBarProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  return (
    <div className="glass-effect rounded-xl p-6 border border-purple-500/20 mb-8">
      <h3 className="text-white font-bold text-lg mb-4">🔍 Filter Movies</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Genre Filter */}
        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Genre
          </label>
          <select
            onChange={(e) => onFilter({ genre: e.target.value || undefined })}
            className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Director Filter */}
        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Director
          </label>
          <select
            onChange={(e) => onFilter({ director: e.target.value || undefined })}
            className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
          >
            <option value="">All Directors</option>
            {directors.map((director) => (
              <option key={director} value={director}>
                {director}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Release Year
          </label>
          <select
            onChange={(e) => onFilter({ year: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
