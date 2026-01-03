import React from 'react'
import { SearchBar } from './SearchBar'

export function SearchSection({ searchTerm, onSearch, isSearching, searchResultsByGenre }: {
  searchTerm: string,
  onSearch: (term: string) => void,
  isSearching: boolean,
  searchResultsByGenre: { genre_name: string, movies: any[] }[]
}) {
  return (
    <div className="mb-8">
      <SearchBar onSearch={onSearch} />
      {isSearching && <div className="text-white mt-2">Searching...</div>}
      {searchResultsByGenre.length > 0 && (
        <div className="mt-4">
          {searchResultsByGenre.map(({ genre_name, movies }) => (
            <div key={genre_name} className="mb-6">
              <h2 className="text-2xl font-semibold text-purple-300 mb-2">{genre_name}</h2>
              <div className="flex flex-wrap gap-4">
                {movies.map(movie => (
                  <div key={movie.id} className="bg-slate-800 rounded-lg p-4 text-white w-60">
                    <div className="font-bold text-lg mb-2">{movie.title}</div>
                    <div className="text-sm text-gray-400">{movie.release_year}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
