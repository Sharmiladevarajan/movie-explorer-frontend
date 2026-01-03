import React from 'react'
import { HorizontalMovieScroll } from './HorizontalMovieScroll'
import type { Movie } from '@/types/movie'

interface Category {
  genre_id: number | string
  genre_name: string
  genre_description: string | null
  movie_count: number
  movies: Movie[]
}

export function CategoriesSection({ categories, onEdit, onDelete, isAdmin }: {
  categories: Category[],
  onEdit: (movie: Movie) => void,
  onDelete: (movie: Movie) => void,
  isAdmin: boolean
}) {
  return (
    <div className="space-y-10 mt-8">
      {categories.map(category => (
        <div key={category.genre_id}>
          <h2 className="text-3xl font-bold text-purple-200 mb-4">{category.genre_name}</h2>
          <HorizontalMovieScroll
            movies={category.movies}
            onEdit={onEdit}
            onDelete={onDelete}
            isAdmin={isAdmin}
          />
        </div>
      ))}
    </div>
  )
}
