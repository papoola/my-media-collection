'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useBooks } from '@/hooks/useBooks'
import { Book } from '@/types/book'
import Link from 'next/link'
import FormInput from '@/components/FormInput'
import FormText from '@/components/FormText'
import FormGenre from '@/components/FormGenre'
import availableGenres from '@/app/books/genres.json'

interface Props {
  title: string
  book: Book  
}

export default function EditBook({
  title,
  book
}: Props) {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { saveBook } = useBooks()
  const [formData, setFormData] = useState<Book>(book)
  
  useEffect(() => {
    setFormData(book)
  }, [book])

  function handleInputChange(name: string, value: any) {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Update the book
    saveBook(formData)
    
    // Navigate back to book detail
    router.push(`/books/${formData.id}`)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href={`/books/${params.id}`} className="link flex items-center">
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to Book
        </Link>
      </div>

      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        
        {JSON.stringify(formData)}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <FormInput
              id="title"
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="col-span-2"
            />
            
            <FormInput
              id="author"
              name="author"
              label="Author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
            
            <FormInput
              id="year"
              name="year"
              label="Year"
              value={formData.year}
              onChange={handleInputChange}
              type="number"
              required
            />
            
            <FormInput
              id="rating"
              name="rating"
              label="Rating (0-5)"
              value={formData.rating}
              onChange={handleInputChange}
              type="number"
              min={0}
              max={5}
              step={0.1}
              required
            />
            
            <FormGenre
              id="genre"
              name="genre"
              label="Genres"
              value={formData.genre}
              onChange={handleInputChange}
              availableGenres={availableGenres}
            />

            <FormText
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="col-span-2"
            />
            
            <FormInput
              id="bolUrl"
              name="bolUrl"
              label="Bol.com URL"
              value={formData.bolUrl}
              onChange={handleInputChange}
              type="url"
              required
              className="col-span-2"
            />

            <FormInput              
              id="poster"
              name="poster"
              label="Poster URL"
              value={formData.poster}
              onChange={handleInputChange}
              type="url"
              className="col-span-2"
            />            
            
            <div className="col-span-2">
              <div className="flex justify-between items-center mt-6">
                <Link 
                  href={`/books/${params.id}`}
                  className="btn btn-secondary"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
