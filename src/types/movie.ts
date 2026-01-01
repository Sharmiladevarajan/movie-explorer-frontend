export interface Movie {
  id: number
  title: string
  director: string
  release_year: number
  genre: string
  rating?: number
  description?: string
  created_at: string
}

export interface MovieInput {
  title: string
  director_name: string
  release_year: number
  genre_name: string
  rating?: number
  description?: string
}

export interface Review {
  id: number
  movie_id: number
  reviewer_name: string
  rating: number
  comment?: string
  created_at: string
}

export interface ReviewInput {
  movie_id: number
  reviewer_name: string
  rating: number
  comment?: string
}
