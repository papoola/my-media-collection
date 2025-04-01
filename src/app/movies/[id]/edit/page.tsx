'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useMovies } from '@/hooks/useMovies'
import { Movie } from '@/types/movie'
import EditMovie from '@/components/EditMovie'

export default function EditMoviePage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { movies, moviesLoaded } = useMovies()
  const [movie, setMovie] = useState<Movie | null>(null)
  
  useEffect(() => {
    // Validate movie ID
    const movieId = parseInt(params.id as string)
    if (isNaN(movieId)) {
      router.push('/movies')
      return
    }

    // Wait for movies to load
    if (!moviesLoaded) return
    
    // Find movie by ID
    const foundMovie = movies.find(movie => movie.id === movieId)
    if (!foundMovie) {
      router.push('/movies')
      return
    }

    setMovie(foundMovie)
  }, [params.id, moviesLoaded, movies, router])

  if (!movie) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <EditMovie title="Edit Movie" movie={movie} />
  )
}
