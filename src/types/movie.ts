export interface Movie {
    id: number
    title: string
    year: number
    rating: number
    director: string        
    genre: string[]
    description: string
    imdbUrl: string
    poster?: string
}