'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useMovies } from '@/hooks/useMovies'
import { Movie } from '@/types/movie'
import Link from 'next/link'
import FormInput from '@/components/FormInput'
import FormText from '@/components/FormText'
import FormGenre from '@/components/FormGenre'
import availableGenres from '@/app/movies/genres.json'

interface Props {
  title: string
  movie: Movie  
}

export default function EditMovie({
  title,
  movie
}: Props) {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { saveMovie } = useMovies()
  const [formData, setFormData] = useState<Movie>(movie)
  
  useEffect(() => {
    setFormData(movie)
  }, [movie])

  function handleInputChange(name: string, value: any) {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Update the movie
    saveMovie(formData)
    
    // Navigate back to movie detail
    router.push(`/movies/${formData.id}`)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href={formData.id ? `/movies/${params.id}` : '/movies'} className="link flex items-center">
          <i className="fa-solid fa-arrow-left mr-2"></i>
          {formData.id ? 'Back to Movie' : 'Back to Movies'}
        </Link>
      </div>

      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        
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
              id="director"
              name="director"
              label="Director"
              value={formData.director}
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
              label="Rating (0-10)"
              value={formData.rating}
              onChange={handleInputChange}
              type="number"
              min={0}
              max={10}
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
              id="imdbUrl"
              name="imdbUrl"
              label="IMDb URL"
              value={formData.imdbUrl}
              onChange={handleInputChange}
              type="url"
              required
              className="col-span-2"
            />

            <FormInput              
              id="poster"
              name="poster"
              label="Poster URL"
              value={formData.poster || ''}
              onChange={handleInputChange}
              type="url"
              className="col-span-2"
            />            
            
            <div className="col-span-2">
              <div className="flex justify-between items-center mt-6">
                <Link 
                  href={formData.id ? `/movies/${params.id}` : '/movies'}
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
