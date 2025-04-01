'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useBooks } from '@/hooks/useBooks'
import { Book } from '@/types/book'
import EditBook from '@/components/EditBook'

export default function EditBookPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { books, booksLoaded } = useBooks()  
  const [book, setBook] = useState<Book | null>(null)
  
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
    const foundBook = books.find(book => book.id === bookId)
    if (!foundBook) {
      router.push('/books')
      return
    }

    setBook(foundBook)
  }, [params.id, booksLoaded, books, router])

  if (!book) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <EditBook title="Edit Book" book={book} />
  )
}
