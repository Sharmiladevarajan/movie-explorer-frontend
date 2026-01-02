export interface Movie {
  id: number
  title: string
  director: string
  director_id?: number
  release_year: number
  genre: string
  rating?: number
  description?: string
  language?: string
  image_url?: string
  created_at: string
  cast?: Actor[]
  reviews?: Review[]
}

export interface MovieInput {
  title: string
  director_name: string
  release_year: number
  genre_name: string
  rating?: number
  description?: string
  language?: string
  image_url?: string
  cast?: { actor_name: string; role: string }[]
}

export interface Actor {
  id: number
  name: string
  bio?: string
  birth_year?: number
  image_url?: string
  role?: string
  movies?: Movie[]
  movie_count?: number
}

export interface Director {
  id: number
  name: string
  bio?: string
  birth_year?: number
  image_url?: string
  movies?: Movie[]
  movie_count?: number
}

export interface Genre {
  id: number
  name: string
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
