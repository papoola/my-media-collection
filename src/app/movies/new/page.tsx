'use client'

import { Movie } from '@/types/movie'
import EditMovie from '@/components/EditMovie'

export default function NewMoviePage() {
  const movie: Movie = {
    id: 0,
    title: '',
    year: 0,
    rating: 0,
    director: '',
    genre: [],
    description: '',
    imdbUrl: '',
    poster: ''
  }

  return (
    <EditMovie title="New Movie" movie={movie} />
  )
}
