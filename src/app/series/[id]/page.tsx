'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSeries } from '@/hooks/useSeries'
import { Serie } from '@/types/serie'
import Genre from '@/components/Genre'
import Link from 'next/link'
import { useConfirmation } from '@/contexts/ConfirmationContext'

export default function SerieDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { seriesLoaded, getSerieById, deleteSerie } = useSeries()
  const [serie, setSerie] = useState<Serie | undefined>()
  const confirmation = useConfirmation()
  
  useEffect(() => {
    // Validate serie ID
    const serieId = parseInt(params.id)
    if (isNaN(serieId)) {
      router.push('/series')
      return
    }

    // Wait for series to load
    if (!seriesLoaded) return
    
    // Get series by ID
    const foundSeries = getSerieById(serieId)
    if (!foundSeries) {
      router.push('/series')
      return
    }
    setSerie(foundSeries)
  }, [params.id, seriesLoaded])

  const handleDelete = () => {
    if (!serie) return
    confirmation.open(
      () => {
        deleteSerie(serie.id)
        router.push('/series')
      },
      {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete "${serie.title}"? This action cannot be undone.`,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
      }
    )
  }

  if (!serie) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/series" className="link flex items-center">
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to Series
        </Link>
        <div className="flex gap-2">
          <Link 
            href={`/series/${serie.id}/edit`} 
            className="btn btn-primary flex items-center"
          >
            <i className="fa-solid fa-edit mr-2"></i>
            Edit Serie
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

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            {serie.poster ? (
              <img
                src={serie.poster}
                alt={`${serie.title} poster`}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <i className="fa-solid fa-tv text-gray-400 text-6xl"></i>
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4">{serie.title}</h1>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Year</h2>
                <p className="flex items-center">
                  <i className="fa-solid fa-calendar-alt mr-2 text-gray-500"></i>
                  {serie.year}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Rating</h2>
                <p className="flex items-center">
                  <i className="fa-solid fa-star mr-2 text-yellow-400"></i>
                  {serie.rating}/10
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Genres</h2>
              <Genre genre={serie.genre} />
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p>{serie.description}</p>
            </div>

            <div>
              <a 
                href={serie.imdbUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                <i className="fa-brands fa-imdb mr-2"></i>
                View on IMDb
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
