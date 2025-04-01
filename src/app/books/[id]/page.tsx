'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useBooks } from '@/hooks/useBooks'
import { Book } from '@/types/book'
import Genre from '@/components/Genre'
import Link from 'next/link'
import { useConfirmation } from '@/contexts/ConfirmationContext'

export default function BookDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { booksLoaded, getBookById, deleteBook } = useBooks()
  const [book, setBook] = useState<Book | undefined>()
  const confirmation = useConfirmation()
  
  useEffect(() => {
    
    // Validate book ID
    const bookId = parseInt(params.id)
    if (isNaN(bookId)) {
      router.push('/books')
      return
    }

    // Wait for books to load
    if (!booksLoaded) return

    // Get book by ID
    const foundBook = getBookById(bookId)
    if (!foundBook) {
      router.push('/books')
      return
    }
    setBook(foundBook)
  }, [params.id, booksLoaded])

  const handleDelete = () => {
    if (!book) return
    confirmation.open(
      () => {
        deleteBook(book.id)
        router.push('/books')
      },
      {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete "${book.title}"? This action cannot be undone.`,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
      }
    )
  }

  if (!book) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/books" className="link flex items-center">
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to Books
        </Link>
        <div className="flex gap-2">
          <Link 
            href={`/books/${book.id}/edit`} 
            className="btn btn-primary flex items-center"
          >
            <i className="fa-solid fa-edit mr-2"></i>
            Edit Book
          </Link>
          <button 
            onClick={handleDelete}
            className="btn btn-danger flex items-center"
          >
            <i className="fa-solid fa-trash-can mr-2"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="card">
        <div className="md:flex">
          <div className="md:w-1/3">
            {book.poster ? (
              <img
                src={book.poster}
                alt={`${book.title} cover`}
                className="w-full h-auto object-contain bg-gray-200 text-gray-400 dark:bg-gray-700"
              />
            ) : (
              <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-400 dark:bg-gray-700">
                <i className="fa-solid fa-book text-6xl"></i>
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Year</h2>
                <p className="flex items-center">
                  <i className="fa-solid fa-calendar-alt mr-2 text-gray-500"></i>
                  {book.year}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Rating</h2>
                <p className="flex items-center">
                  <i className="fa-solid fa-star mr-2 text-yellow-400"></i>
                  {book.rating}/5
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Author</h2>
                <p className="flex items-center">
                  {book.author}
                </p>
              </div>
            </div>            

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Genres</h2>
              <Genre genre={book.genre} />
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p>{book.description}</p>
            </div>

            <div>
              <a 
                href={book.bolUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                <i className="fa-solid fa-chain mr-2"></i>
                View on Bol.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
