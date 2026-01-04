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
    </div>
  )
}
