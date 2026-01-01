import axios from 'axios'
import type { Movie, MovieInput, Review, ReviewInput, Actor, Director, Genre } from '@/types/movie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  async getMovies(params?: { limit?: number; offset?: number; genre?: string; director?: string; actor?: string; year?: number }) {
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
    const response = await apiClient.get<{ directors: Director[]; count: number }>('/api/directors')
    return response.data
  },

  async getDirector(id: number) {
    const response = await apiClient.get<Director>(`/api/directors/${id}`)
    return response.data
  },

  async getGenres() {
    const response = await apiClient.get<{ genres: Genre[]; count: number }>('/api/genres')
    return response.data
  },

  async getActors(params?: { limit?: number; offset?: number; genre?: string }) {
    const response = await apiClient.get<{ actors: Actor[]; count: number }>('/api/actors', { params })
    return response.data
  },

  async getActor(id: number) {
    const response = await apiClient.get<Actor>(`/api/actors/${id}`)
    return response.data
  },
}
