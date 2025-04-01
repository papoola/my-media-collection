'use client'

interface Props {
    genre: string[]
    className?: string
    onRemove?: (genre: string) => void
}

export default function Genre({ genre, className = '', onRemove }: Props) {
    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {genre.map((genre, index) => (
                <span 
                    key={index} 
                    className={`px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center ${onRemove ? 'pr-2' : ''} dark:bg-gray-700`}
                >
                    {genre}
                    {onRemove && (
                        <button 
                            type="button"
                            onClick={() => onRemove(genre)}
                            className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            aria-label="Remove genre"
                        >
                            <i className="fa-solid fa-times text-xs"></i>
                        </button>
                    )}
                </span>
            ))}
        </div>
    )
}