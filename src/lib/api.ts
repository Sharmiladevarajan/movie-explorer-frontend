import axios from 'axios'
import type { Movie, MovieInput, Review, ReviewInput } from '@/types/movie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  async getMovies(limit = 100, offset = 0, genre?: string) {
    const params: any = { limit, offset }
    if (genre) params.genre = genre
    const response = await apiClient.get<{ movies: Movie[]; count: number }>('/api/movies', { params })
    return response.data
  },

  async getMovie(id: number) {
    const response = await apiClient.get<Movie>(`/api/movies/${id}`)
    return response.data
  },

  async createMovie(movie: MovieInput) {
    const response = await apiClient.post<Movie>('/api/movies', movie)
    return response.data
  },

  async updateMovie(id: number, movie: Partial<MovieInput>) {
    const response = await apiClient.put<Movie>(`/api/movies/${id}`, movie)
    return response.data
  },

  async deleteMovie(id: number) {
    const response = await apiClient.delete(`/api/movies/${id}`)
    return response.data
  },

  async searchMovies(searchTerm: string) {
    const response = await apiClient.get<{ movies: Movie[]; count: number }>(`/api/movies/search/${searchTerm}`)
    return response.data
  },

  async getMovieReviews(movieId: number) {
    const response = await apiClient.get<{ reviews: Review[]; count: number }>(`/api/movies/${movieId}/reviews`)
    return response.data
  },

  async createReview(review: ReviewInput) {
    const response = await apiClient.post<Review>('/api/reviews', review)
    return response.data
  },

  async getDirectors() {
    const response = await apiClient.get('/api/directors')
    return response.data
  },

  async getGenres() {
    const response = await apiClient.get('/api/genres')
    return response.data
  },
}
