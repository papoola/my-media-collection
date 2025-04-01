import { useState, useEffect } from 'react'
import { Book } from '@/types/book'
import samples from '@/app/books/samples.json'

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [booksLoaded, setBooksLoaded] = useState(false)

  useEffect(() => {

    // Load books from localStorage or use sample books
    const storedBooks = localStorage.getItem('books')
    let booksArray: Book[]
    if (!storedBooks) {
      localStorage.setItem('books', JSON.stringify(samples))
      booksArray = samples   
    } else {
      booksArray = JSON.parse(storedBooks)
    }
    setBooks(booksArray)
    setBooksLoaded(true)
  }, [])

  /**
   * Saves a book to the books array and updates localStorage.
   * @param book - The book to save.
   */
  function saveBook(book: Book) {
    let newBooks: Book[]
    if (!book.id) {
      const newId = books.reduce((acc, book) => Math.max(acc, book.id), 0) + 1
      newBooks = [...books, { ...book, id: newId }]
    } else {
      newBooks = books.map(existingBook => existingBook.id === book.id ? { ...book } : existingBook)
    }
    setBooks(newBooks)
    localStorage.setItem('books', JSON.stringify(newBooks))
  }

  /**
   * Deletes a book from the books array and updates localStorage.
   * @param id - The ID of the book to delete.
   */
  function deleteBook(id: number) {
    const newBooks = books.filter(book => book.id !== id)
    setBooks(newBooks)
    localStorage.setItem('books', JSON.stringify(newBooks))
  }

  /**
   * Retrieves a book by its ID.
   * @param id - The ID of the book to retrieve.
   * @returns The book with the specified ID, or undefined if not found.
   */
  function getBookById(id: number) {
    return books.find(book => book.id === id)
  }

  return {
    books,
    booksLoaded,
    saveBook,
    deleteBook,
    getBookById
  }
}
