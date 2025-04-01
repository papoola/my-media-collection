

const { expect, describe, it } = require('@jest/globals')
import { render, screen, fireEvent } from '@testing-library/react'
import Collection from '@/components/Collection'
import { Book } from '@/types/book'

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Collection component', () => {
  // Test data
  const testBooks: Book[] = [
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
  ]

  // Test render function
  const renderBookItem = (book: Book) => (
    <div data-testid={`book-${book.id}`}>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
    </div>
  )

  it('renders the collection with title and items', () => {
    render(
      <Collection<Book>
        icon="fa-book"
        title="Books"
        items={testBooks}
        newItemPath="/books/new"
        renderItem={renderBookItem}
      />
    )

    // Check title is rendered
    expect(screen.getByText('Books')).toBeInTheDocument()
    
    // Check all items are rendered
    expect(screen.getByTestId('book-1')).toBeInTheDocument()
    expect(screen.getByTestId('book-2')).toBeInTheDocument()
    
    // Check item content
    expect(screen.getByText('Test Book 1')).toBeInTheDocument()
    expect(screen.getByText('Test Book 2')).toBeInTheDocument()
    
    // Check "Add New" button is present
    const addButton = screen.getByText('Add New')
    expect(addButton).toBeInTheDocument()
    expect(addButton.closest('a')).toHaveAttribute('href', '/books/new')
  })

  it('filters items based on search input', () => {
    render(
      <Collection<Book>
        icon="fa-book"
        title="Books"
        items={testBooks}
        newItemPath="/books/new"
        renderItem={renderBookItem}
      />
    )

    // All items should be visible initially
    expect(screen.getByTestId('book-1')).toBeInTheDocument()
    expect(screen.getByTestId('book-2')).toBeInTheDocument()
    
    // Filter for "Test Book 1"
    const searchInput = screen.getByPlaceholderText('Search Books...')
    fireEvent.change(searchInput, { target: { value: 'Test Book 1' } })
    
    // Only "Test Book 1" should be visible
    expect(screen.getByTestId('book-1')).toBeInTheDocument()
    expect(screen.queryByTestId('book-2')).not.toBeInTheDocument()
    
    // Clear filter
    fireEvent.change(searchInput, { target: { value: '' } })
    
    // All items should be visible again
    expect(screen.getByTestId('book-1')).toBeInTheDocument()
    expect(screen.getByTestId('book-2')).toBeInTheDocument()
  })

  it.only('handles case-insensitive search', () => {
    render(
      <Collection<Book>
        icon="fa-book"
        title="Books"
        items={testBooks}
        newItemPath="/books/new"
        renderItem={renderBookItem}
      />
    )
    
    // Search with lowercase - use a more specific query that only matches one book
    const searchInput = screen.getByPlaceholderText('Search Books...')
    fireEvent.change(searchInput, { target: { value: 'test book 1' } })
    
    // Should find only "Test Book 1" (exact match with case insensitivity)
    // console.log('check', screen.getByTestId('book-2'))
    expect(screen.getByTestId('book-1')).toBeInTheDocument()
    expect(screen.queryByTestId('book-2')).not.toBeInTheDocument()
    
    // Search with mixed case
    fireEvent.change(searchInput, { target: { value: 'TeSt bOoK 2' } })
    
    // Should find "Another Author"
    expect(screen.queryByTestId('book-1')).not.toBeInTheDocument()
    expect(screen.getByTestId('book-2')).toBeInTheDocument()
  })

  it('displays no items when search has no matches', () => {
    render(
      <Collection<Book>
        icon="fa-book"
        title="Books"
        items={testBooks}
        newItemPath="/books/new"
        renderItem={renderBookItem}
      />
    )
    
    // Search for something that doesn't exist
    const searchInput = screen.getByPlaceholderText('Search Books...')
    fireEvent.change(searchInput, { target: { value: 'No Match' } })
    
    // No items should be visible
    expect(screen.queryByTestId('book-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('book-2')).not.toBeInTheDocument()
  })
})
