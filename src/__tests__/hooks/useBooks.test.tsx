const { expect, describe, it } = require('@jest/globals')
import { renderHook, act } from '@testing-library/react'
import { useBooks } from '@/hooks/useBooks'
import { Book } from '@/types/book'

// Mock the samples import
jest.mock('@/app/books/samples.json', () => [
  {
    id: 1,
    title: 'Test Book 1',
    year: 2020,
    rating: 4.5,
    author: 'Test Author',
    genre: ['Fiction', 'Drama'],
    description: 'Test description',
    bolUrl: 'https://www.bol.com/test1',
    poster: 'https://example.com/test1.jpg'
  },
  {
    id: 2,
    title: 'Test Book 2',
    year: 2021,
    rating: 3.8,
    author: 'Another Author',
    genre: ['Non-fiction', 'Biography'],
    description: 'Another test description',
    bolUrl: 'https://www.bol.com/test2',
    poster: 'https://example.com/test2.jpg'
  }
])

describe('useBooks hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should load sample books when localStorage is empty', () => {
    const { result } = renderHook(() => useBooks())
    
    // Initial state should have books loaded from samples
    expect(result.current.books).toHaveLength(2)
    expect(result.current.books[0].title).toBe('Test Book 1')
    expect(result.current.booksLoaded).toBe(true)
    
    // Check that localStorage was updated with sample data
    const storedBooks = JSON.parse(localStorage.getItem('books') || '[]')
    expect(storedBooks).toHaveLength(2)
  })

  it('should load books from localStorage if available', () => {
    // Setup localStorage with test data
    const testBooks: Book[] = [
      {
        id: 3,
        title: 'Stored Book',
        year: 2022,
        rating: 4.0,
        author: 'Stored Author',
        genre: ['Mystery', 'Thriller'],
        description: 'Stored description',
        bolUrl: 'https://www.bol.com/stored',
        poster: 'https://example.com/stored.jpg'
      }
    ]
    localStorage.setItem('books', JSON.stringify(testBooks))
    
    const { result } = renderHook(() => useBooks())
    
    // Should load from localStorage instead of samples
    expect(result.current.books).toHaveLength(1)
    expect(result.current.books[0].title).toBe('Stored Book')
  })

  it('should save a new book correctly', () => {
    const { result } = renderHook(() => useBooks())
    
    const newBook: Omit<Book, 'id'> = {
      title: 'New Book',
      year: 2023,
      rating: 5.0,
      author: 'New Author',
      genre: ['Science Fiction'],
      description: 'New description',
      bolUrl: 'https://www.bol.com/new'
    }
    
    act(() => {
      result.current.saveBook(newBook as Book)
    })
    
    // Should add the book with a new ID
    expect(result.current.books).toHaveLength(3)
    expect(result.current.books[2].title).toBe('New Book')
    expect(result.current.books[2].id).toBe(3) // Should assign ID 3 (max ID + 1)
    
    // Check localStorage was updated
    const storedBooks = JSON.parse(localStorage.getItem('books') || '[]')
    expect(storedBooks).toHaveLength(3)
  })

  it('should update an existing book correctly', () => {
    const { result } = renderHook(() => useBooks())
    
    // Get the first book and modify it
    const bookToUpdate = { ...result.current.books[0], title: 'Updated Title' }
    
    act(() => {
      result.current.saveBook(bookToUpdate)
    })
    
    // Should update the book without changing the length
    expect(result.current.books).toHaveLength(2)
    expect(result.current.books[0].title).toBe('Updated Title')
    expect(result.current.books[0].id).toBe(1) // ID should remain the same
    
    // Check localStorage was updated
    const storedBooks = JSON.parse(localStorage.getItem('books') || '[]')
    expect(storedBooks[0].title).toBe('Updated Title')
  })

  it('should delete a book correctly', () => {
    const { result } = renderHook(() => useBooks())
    
    act(() => {
      result.current.deleteBook(1)
    })
    
    // Should remove the book
    expect(result.current.books).toHaveLength(1)
    expect(result.current.books[0].id).toBe(2) // Only book with ID 2 should remain
    
    // Check localStorage was updated
    const storedBooks = JSON.parse(localStorage.getItem('books') || '[]')
    expect(storedBooks).toHaveLength(1)
    expect(storedBooks[0].id).toBe(2)
  })

  it('should get a book by ID correctly', () => {
    const { result } = renderHook(() => useBooks())
    
    const book = result.current.getBookById(2)
    
    expect(book).toBeDefined()
    expect(book?.title).toBe('Test Book 2')
    
    const nonExistentBook = result.current.getBookById(999)
    expect(nonExistentBook).toBeUndefined()
  })
})
