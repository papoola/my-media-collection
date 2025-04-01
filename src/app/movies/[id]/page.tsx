'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useMovies } from '@/hooks/useMovies'
import { Movie } from '@/types/movie'
import Genre from '@/components/Genre'
import Link from 'next/link'
import { useConfirmation } from '@/contexts/ConfirmationContext'

export default function MovieDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { moviesLoaded, getMovieById, deleteMovie } = useMovies()
  const [movie, setMovie] = useState<Movie | undefined>()
  const confirmation = useConfirmation()
  
  useEffect(() => {

    // Validate movie ID
    const movieId = parseInt(params.id)
    if (isNaN(movieId)) {
      router.push('/movies')
      return
    }

    // Wait for movies to load
    if (!moviesLoaded) return

    // Get movie by ID
    const foundMovie = getMovieById(movieId)
    if (!foundMovie) {
      router.push('/movies')
      return
    }
    setMovie(foundMovie)
  }, [params.id, moviesLoaded])

  const handleDelete = () => {
    if (!movie) return
    confirmation.open(
      () => {
        deleteMovie(movie.id)
        router.push('/movies')
      },
      {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete "${movie.title}"? This action cannot be undone.`,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
      }
    )
  }

  if (!movie) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/movies" className="link flex items-center">
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to Movies
        </Link>
        <div className="flex gap-2">
          <Link 
            href={`/movies/${movie.id}/edit`} 
            className="btn btn-primary flex items-center"
          >
            <i className="fa-solid fa-edit mr-2"></i>
            Edit Movie
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
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <i className="fa-solid fa-film text-gray-400 text-6xl"></i>
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Year</h2>
                <p className="flex items-center">
                  <i className="fa-solid fa-calendar-alt mr-2 text-gray-500"></i>
                  {movie.year}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Rating</h2>
                <p className="flex items-center">
                  <i className="fa-solid fa-star mr-2 text-yellow-400"></i>
                  {movie.rating}/10
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Director</h2>
                <p className="flex items-center">
                  {movie.director}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Genres</h2>
              <Genre genre={movie.genre} />
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p>{movie.description}</p>
            </div>

            <div>
              <a 
                href={movie.imdbUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fa-solid fa-chain mr-2"></i>
                View on IMDb
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
