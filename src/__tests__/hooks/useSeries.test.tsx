const { expect, describe, it } = require('@jest/globals')
import { renderHook, act } from '@testing-library/react'
import { useSeries } from '@/hooks/useSeries'
import { Serie } from '@/types/serie'

// Mock the samples import
jest.mock('@/app/series/samples.json', () => [
  {
    id: 1,
    title: 'Test Series 1',
    year: 2020,
    rating: 8.5,
    genre: ['Drama', 'Thriller'],
    description: 'Test series description',
    imdbUrl: 'https://www.imdb.com/test-series1',
    poster: 'https://example.com/test-series1.jpg'
  },
  {
    id: 2,
    title: 'Test Series 2',
    year: 2021,
    rating: 7.8,
    genre: ['Comedy', 'Fantasy'],
    description: 'Another test series description',
    imdbUrl: 'https://www.imdb.com/test-series2',
    poster: 'https://example.com/test-series2.jpg'
  }
])

describe('useSeries hook', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should load sample series when localStorage is empty', () => {
    const { result } = renderHook(() => useSeries())
    
    // Initial state should have series loaded from samples
    expect(result.current.series).toHaveLength(2)
    expect(result.current.series[0].title).toBe('Test Series 1')
    expect(result.current.seriesLoaded).toBe(true)
    
    // Check that localStorage was updated with sample data
    const storedSeries = JSON.parse(localStorage.getItem('series') || '[]')
    expect(storedSeries).toHaveLength(2)
  })

  it('should load series from localStorage if available', () => {
    // Setup localStorage with test data
    const testSeries = [
      {
        id: 3,
        title: 'Stored Series',
        year: 2022,
        rating: 9.0,
        genre: ['Sci-Fi'],
        description: 'Stored series description',
        imdbUrl: 'https://www.imdb.com/stored-series',
        poster: 'https://example.com/stored-series.jpg'
      }
    ]
    localStorage.setItem('series', JSON.stringify(testSeries))
    
    const { result } = renderHook(() => useSeries())
    
    // Should load from localStorage instead of samples
    expect(result.current.series).toHaveLength(1)
    expect(result.current.series[0].title).toBe('Stored Series')
  })

  it('should save a new serie correctly', () => {
    const { result } = renderHook(() => useSeries())
    
    const newSerie: Omit<Serie, 'id'> = {
      title: 'New Series',
      year: 2023,
      rating: 8.0,
      genre: ['Action'],
      description: 'New series description',
      imdbUrl: 'https://www.imdb.com/new-series',
      poster: 'https://example.com/new-series.jpg'
    }
    
    act(() => {
      result.current.saveSerie(newSerie as Serie)
    })
    
    // Should add the serie with a new ID
    expect(result.current.series).toHaveLength(3)
    expect(result.current.series[2].title).toBe('New Series')
    expect(result.current.series[2].id).toBe(3) // Should assign ID 3 (max ID + 1)
    
    // Check localStorage was updated
    const storedSeries = JSON.parse(localStorage.getItem('series') || '[]')
    expect(storedSeries).toHaveLength(3)
  })

  it('should update an existing serie correctly', () => {
    const { result } = renderHook(() => useSeries())
    
    // Get the first serie and modify it
    const serieToUpdate = { ...result.current.series[0], title: 'Updated Title' }
    
    act(() => {
      result.current.saveSerie(serieToUpdate)
    })
    
    // Should update the serie without changing the length
    expect(result.current.series).toHaveLength(2)
    expect(result.current.series[0].title).toBe('Updated Title')
    expect(result.current.series[0].id).toBe(1) // ID should remain the same
    
    // Check localStorage was updated
    const storedSeries = JSON.parse(localStorage.getItem('series') || '[]')
    expect(storedSeries[0].title).toBe('Updated Title')
  })

  it('should delete a serie correctly', () => {
    const { result } = renderHook(() => useSeries())
    
    act(() => {
      result.current.deleteSerie(1)
    })
    
    // Should remove the serie
    expect(result.current.series).toHaveLength(1)
    expect(result.current.series[0].id).toBe(2) // Only serie with ID 2 should remain
    
    // Check localStorage was updated
    const storedSeries = JSON.parse(localStorage.getItem('series') || '[]')
    expect(storedSeries).toHaveLength(1)
    expect(storedSeries[0].id).toBe(2)
  })

  it('should get a serie by ID correctly', () => {
    const { result } = renderHook(() => useSeries())
    
    const serie = result.current.getSerieById(2)
    
    expect(serie).toBeDefined()
    expect(serie?.title).toBe('Test Series 2')
    
    const nonExistentSerie = result.current.getSerieById(999)
    expect(nonExistentSerie).toBeUndefined()
  })
})
