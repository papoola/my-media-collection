'use client'

import { Book } from '@/types/book'
import EditBook from '@/components/EditBook'

export default function EditBookPage() {
  const book: Book = {
    id: 0,
    title: '',    
    year: 0,
    poster: '',
    rating: 0,
    author: '',
    bolUrl: '',
    genre: [],
    description: ''
  }

  return (
    <EditBook title="New Book" book={book} />
  )
}
