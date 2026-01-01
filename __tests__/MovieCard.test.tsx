import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MovieCard } from '../src/components/MovieCard'

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}))

describe('MovieCard', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    director: 'Test Director',
    release_year: 2024,
    genre: 'Action',
    rating: 8.5,
    description: 'A test movie description',
    created_at: '2024-01-01T00:00:00Z',
  }

  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()

  it('renders movie information correctly', () => {
    render(
      <MovieCard
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('Test Director')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('displays rating when provided', () => {
    render(
      <MovieCard
        movie={mockMovie}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('8.5')).toBeInTheDocument()
  })
})
