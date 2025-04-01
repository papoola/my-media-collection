'use client'
import { useRouter } from 'next/navigation'
import { useMovies } from '@/hooks/useMovies'
import { Movie } from '@/types/movie'
import Collection from '@/components/Collection'
import Genre from '@/components/Genre'

export default function MoviesPage() {
    const { movies } = useMovies()
    const router = useRouter()

    function renderMovie(movie: Movie) {
        return (
            <div 
                className="card cursor-pointer"
                onClick={() => router.push(`/movies/${movie.id}`)}
            >
                {movie.poster ? (
                    <img
                        src={movie.poster}
                        alt={`${movie.title} poster`}
                        className="w-full h-64 object-cover bg-gray-200 text-gray-400 dark:bg-gray-700"
                    />
                ) : (
                    <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-400 dark:bg-gray-700">
                        <i className="fa-solid fa-film text-6xl"></i>
                    </div>
                )}
            
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 min-h-16">{movie.title}</h2>

                    <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                            <i className="fa-solid fa-calendar-alt mr-2"></i>
                            <span>{movie.year}</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fa-solid fa-star text-yellow-400 mr-2"></i>
                            <span>{movie.rating}</span>
                        </div>
                    </div>

                    <Genre genre={movie.genre} />
                </div>
            </div>
        )
    }

    return (
        <Collection<Movie>
            icon="fa-film"
            title="Movies Collection"
            items={movies}
            newItemPath="/movies/new"
            renderItem={renderMovie}
        />
    )
}