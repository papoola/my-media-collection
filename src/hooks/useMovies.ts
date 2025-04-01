import { useState, useEffect } from 'react'
import { Movie } from '@/types/movie'
import samples from '@/app/movies/samples.json'

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [moviesLoaded, setMoviesLoaded] = useState(false)

  useEffect(() => {

    // Load movies from localStorage or use sample movies
    const storedMovies = localStorage.getItem('movies')
    let moviesArray: Movie[] = []
    if (!storedMovies) {
      localStorage.setItem('movies', JSON.stringify(samples))
      moviesArray = samples
    } else {
      moviesArray = JSON.parse(storedMovies)
    }    
    setMovies(moviesArray)
    setMoviesLoaded(true)
  }, [])

  /**
   * Saves a movie to the movies array and updates localStorage.
   * @param movie - The movie to save.
   */
  function saveMovie(movie: Movie) {
    let newMovies: Movie[]
    if (!movie.id) {
      const newId = movies.reduce((acc, movie) => Math.max(acc, movie.id), 0) + 1
      newMovies = [...movies, { ...movie, id: newId }]
    } else {
      newMovies = movies.map(existingMovie => existingMovie.id === movie.id ? { ...movie } : existingMovie)
    }
    setMovies(newMovies)
    localStorage.setItem('movies', JSON.stringify(newMovies))
  }

  /**
   * Deletes a movie from the movies array and updates localStorage.
   * @param id - The ID of the movie to delete.
   */
  function deleteMovie(id: number) {
    const newMovies = movies.filter(movie => movie.id !== id)
    setMovies(newMovies)
    localStorage.setItem('movies', JSON.stringify(newMovies))
  }

  /**
   * Retrieves a movie by its ID.
   * @param id - The ID of the movie to retrieve.
   * @returns The movie with the specified ID, or undefined if not found.
   */
  function getMovieById(id: number) {
    return movies.find(movie => movie.id === id)
  }

  return {
    movies,
    moviesLoaded,
    saveMovie,
    deleteMovie,
    getMovieById
  }
}
