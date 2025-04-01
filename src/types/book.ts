export interface Book {
    id: number
    title: string
    year: number
    rating: number
    author: string
    genre: string[]
    description: string
    bolUrl: string
    poster?: string    
}