import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Movie, MovieInput, Actor, Director, Genre, Review, ReviewInput } from '@/types/movie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['Movie', 'Actor', 'Director', 'Genre', 'Review'],
  endpoints: (builder) => ({
    // Movies endpoints
    getMovies: builder.query<
      { categories: any[]; total_categories: number }, 
      { limit_per_genre?: number; genre?: string; director?: string; actor?: string; year?: number }
    >({
      query: (params = {}) => ({
        url: '/api/movies',
        params,
      }),
      providesTags: ['Movie'],
    }),
    
    getMovie: builder.query<Movie, number>({
      query: (id) => `/api/movies/${id}`,
      providesTags: (result, error, id) => [{ type: 'Movie', id }],
    }),
    
    createMovie: builder.mutation<Movie, MovieInput>({
      query: (movie) => ({
        url: '/api/movies',
        method: 'POST',
        body: movie,
      }),
      invalidatesTags: ['Movie'],
    }),
    
    updateMovie: builder.mutation<Movie, { id: number; movie: Partial<MovieInput> }>({
      query: ({ id, movie }) => ({
        url: `/api/movies/${id}`,
        method: 'PUT',
        body: movie,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Movie', id }, 'Movie'],
    }),
    
    deleteMovie: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/movies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Movie'],
    }),
    
    searchMovies: builder.query<{ movies: Movie[]; count: number }, string>({
      query: (searchTerm) => `/api/movies/search/${searchTerm}`,
      providesTags: ['Movie'],
    }),
    
    // Actors endpoints
    getActors: builder.query<
      { actors: Actor[]; count: number }, 
      { limit?: number; offset?: number; genre?: string }
    >({
      query: (params = {}) => ({
        url: '/api/actors',
        params,
      }),
      providesTags: ['Actor'],
    }),
    
    getActor: builder.query<Actor, number>({
      query: (id) => `/api/actors/${id}`,
      providesTags: (result, error, id) => [{ type: 'Actor', id }],
    }),
    
    // Directors endpoints
    getDirectors: builder.query<{ directors: Director[]; count: number }, void>({
      query: () => '/api/directors',
      providesTags: ['Director'],
    }),
    
    getDirector: builder.query<Director, number>({
      query: (id) => `/api/directors/${id}`,
      providesTags: (result, error, id) => [{ type: 'Director', id }],
    }),
    
    // Genres endpoints
    getGenres: builder.query<{ genres: Genre[]; count: number }, void>({
      query: () => '/api/genres',
      providesTags: ['Genre'],
    }),
    
    // Reviews endpoints
    getMovieReviews: builder.query<{ reviews: Review[]; count: number }, number>({
      query: (movieId) => `/api/movies/${movieId}/reviews`,
      providesTags: (result, error, movieId) => [{ type: 'Review', id: movieId }],
    }),
    
    createReview: builder.mutation<Review, ReviewInput>({
      query: (review) => ({
        url: '/api/reviews',
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Review'],
    }),
    
    // Genre-specific movie endpoints
    getMoviesByGenrePaginated: builder.query<
      { movies: Movie[]; count: number; total: number; has_more: boolean },
      { genreName: string; limit?: number; offset?: number }
    >({
      query: ({ genreName, limit = 20, offset = 0 }) => ({
        url: `/api/movies/genre/${genreName}`,
        params: { limit, offset },
      }),
      providesTags: ['Movie'],
    }),
  }),
})

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useSearchMoviesQuery,
  useLazySearchMoviesQuery,
  useGetActorsQuery,
  useGetActorQuery,
  useGetDirectorsQuery,
  useGetDirectorQuery,
  useGetGenresQuery,
  useGetMovieReviewsQuery,
  useCreateReviewMutation,
  useGetMoviesByGenrePaginatedQuery,
} = moviesApi