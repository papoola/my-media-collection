
const { expect, describe, it } = require('@jest/globals')
import { renderHook, act } from '@testing-library/react'
import { useMovies } from '@/hooks/useMovies'
import { Movie } from '@/types/movie'

// Mock the samples import
jest.mock('@/app/movies/samples.json', () => [
  {
    id: 1,
    title: 'Test Movie 1',
    year: 2020,
    rating: 8.5,
    director: 'Test Director',
    genre: ['Action', 'Thriller'],
    description: 'Test movie description',
    imdbUrl: 'https://www.imdb.com/test1',
    poster: 'https://example.com/test1.jpg'
  },
  {
    id: 2,
    title: 'Test Movie 2',
    year: 2021,
    rating: 7.8,
    director: 'Another Director',
    genre: ['Drama', 'Comedy'],
    description: 'Another test movie description',
    imdbUrl: 'https://www.imdb.com/test2',
    poster: 'https://example.com/test2.jpg'
  }
])

describe('useMovies hook', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should load sample movies when localStorage is empty', () => {
    const { result } = renderHook(() => useMovies())
    
    // Initial state should have movies loaded from samples
    expect(result.current.movies).toHaveLength(2)
    expect(result.current.movies[0].title).toBe('Test Movie 1')
    expect(result.current.moviesLoaded).toBe(true)
    
    // Check that localStorage was updated with sample data
    const storedMovies = JSON.parse(localStorage.getItem('movies') || '[]')
    expect(storedMovies).toHaveLength(2)
  })

  it('should load movies from localStorage if available', () => {
    // Setup localStorage with test data
    const testMovies = [
      {
        id: 3,
        title: 'Stored Movie',
        year: 2022,
        rating: 9.0,
        director: 'Stored Director',
        genre: ['Sci-Fi'],
        description: 'Stored movie description',
        imdbUrl: 'https://www.imdb.com/stored',
        poster: 'https://example.com/stored.jpg'
      }
    ]
    localStorage.setItem('movies', JSON.stringify(testMovies))
    
    const { result } = renderHook(() => useMovies())
    
    // Should load from localStorage instead of samples
    expect(result.current.movies).toHaveLength(1)
    expect(result.current.movies[0].title).toBe('Stored Movie')
  })

  it('should save a new movie correctly', () => {
    const { result } = renderHook(() => useMovies())
    
    const newMovie: Omit<Movie, 'id'> = {
      title: 'New Movie',
      year: 2023,
      rating: 8.0,
      director: 'New Director',
      genre: ['Action'],
      description: 'New movie description',
      imdbUrl: 'https://www.imdb.com/new'
    }
    
    act(() => {
      result.current.saveMovie(newMovie as Movie)
    })
    
    // Should add the movie with a new ID
    expect(result.current.movies).toHaveLength(3)
    expect(result.current.movies[2].title).toBe('New Movie')
    expect(result.current.movies[2].id).toBe(3) // Should assign ID 3 (max ID + 1)
    
    // Check localStorage was updated
    const storedMovies = JSON.parse(localStorage.getItem('movies') || '[]')
    expect(storedMovies).toHaveLength(3)
  })

  it('should update an existing movie correctly', () => {
    const { result } = renderHook(() => useMovies())
    
    // Get the first movie and modify it
    const movieToUpdate = { ...result.current.movies[0], title: 'Updated Title' }
    
    act(() => {
      result.current.saveMovie(movieToUpdate)
    })
    
    // Should update the movie without changing the length
    expect(result.current.movies).toHaveLength(2)
    expect(result.current.movies[0].title).toBe('Updated Title')
    expect(result.current.movies[0].id).toBe(1) // ID should remain the same
    
    // Check localStorage was updated
    const storedMovies = JSON.parse(localStorage.getItem('movies') || '[]')
    expect(storedMovies[0].title).toBe('Updated Title')
  })

  it('should delete a movie correctly', () => {
    const { result } = renderHook(() => useMovies())
    
    act(() => {
      result.current.deleteMovie(1)
    })
    
    // Should remove the movie
    expect(result.current.movies).toHaveLength(1)
    expect(result.current.movies[0].id).toBe(2) // Only movie with ID 2 should remain
    
    // Check localStorage was updated
    const storedMovies = JSON.parse(localStorage.getItem('movies') || '[]')
    expect(storedMovies).toHaveLength(1)
    expect(storedMovies[0].id).toBe(2)
  })

  it('should get a movie by ID correctly', () => {
    const { result } = renderHook(() => useMovies())
    
    const movie = result.current.getMovieById(2)
    
    expect(movie).toBeDefined()
    expect(movie?.title).toBe('Test Movie 2')
    
    const nonExistentMovie = result.current.getMovieById(999)
    expect(nonExistentMovie).toBeUndefined()
  })
})
