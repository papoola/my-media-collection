'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSeries } from '@/hooks/useSeries'
import { Serie } from '@/types/serie'
import EditSerie from '@/components/EditSerie'

export default function EditSeriePage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { series, seriesLoaded } = useSeries()
  const [serie, setSerie] = useState<Serie | null>(null)
  
  useEffect(() => {
    // Validate serie ID
    const serieId = parseInt(params.id as string)
    if (isNaN(serieId)) {
      router.push('/series')
      return
    }

    // Wait for series to load
    if (!seriesLoaded) return
    
    // Find serie by ID
    const foundSerie = series.find(serie => serie.id === serieId)
    if (!foundSerie) {
      router.push('/series')
      return
    }

    setSerie(foundSerie)
  }, [params.id, seriesLoaded, series, router])

  if (!serie) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <EditSerie title="Edit Serie" serie={serie} />
  )
}
