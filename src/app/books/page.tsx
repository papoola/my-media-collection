'use client'

import { useBooks } from '@/hooks/useBooks'
import { Book } from '@/types/book'
import Collection from '@/components/Collection'
import { useRouter } from 'next/navigation'
import Genre from '@/components/Genre'

export default function BooksPage() {
    const { books } = useBooks()
    const router = useRouter()

    function renderBook(book: Book): React.ReactNode {
        return (
            <div 
                className="card cursor-pointer"
                onClick={() => router.push(`/books/${book.id}`)}
            >
                {book.poster ? (
                    <img
                        src={book.poster}
                        alt={`${book.title} poster`}
                        className="w-full h-64 object-contain bg-gray-200"
                    />
                ) : (
                    <div className="bg-gray-200 h-64 flex items-center justify-center">
                        <i className="fa-solid fa-book text-gray-400 text-6xl"></i>
                    </div>
                )}
            
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 min-h-16">{book.title}</h2>

                    <div className="flex justify-between mb-2 text-gray-600">
                        <div className="flex items-center">
                            <span>{book.author}</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fa-solid fa-star text-yellow-400 mr-2"></i>
                            <span>{book.rating}</span>
                        </div>
                    </div>

                    <Genre genre={book.genre} />
                </div>
            </div>
        )
    }

    return (
        <Collection<Book>
            icon="fa-book-open"
            title="Books Collection"
            items={books}
            newItemPath="/books/new"
            renderItem={renderBook}
        />
    )
}