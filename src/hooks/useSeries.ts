import { useState, useEffect } from 'react'
import { Serie } from '@/types/serie'
import samples from '@/app/series/samples.json'

export function useSeries() {
  const [series, setSeries] = useState<Serie[]>([])
  const [seriesLoaded, setSeriesLoaded] = useState(false)

  useEffect(() => {

    // Load series from localStorage or use sample series
    const storedSeries = localStorage.getItem('series')
    let seriesArray: Serie[]
    if (!storedSeries) {
      localStorage.setItem('series', JSON.stringify(samples))
      seriesArray = samples
    } else {
      seriesArray = JSON.parse(storedSeries)
    }
    setSeries(seriesArray)
    setSeriesLoaded(true)
  }, [])

  /**
   * Saves a serie to the series array and updates localStorage.
   * @param serie - The serie to save.
   */
  function saveSerie(serie: Serie) {
    let newSeries: Serie[]
    if (!serie.id) {
      const newId = series.reduce((acc, serie) => Math.max(acc, serie.id), 0) + 1
      newSeries = [...series, { ...serie, id: newId }]
    } else {
      newSeries = series.map(existingSerie => existingSerie.id === serie.id ? { ...serie } : existingSerie)
    }
    setSeries(newSeries)
    localStorage.setItem('series', JSON.stringify(newSeries))
  }

  /**
   * Deletes a serie from the series array and updates localStorage.
   * @param id - The ID of the serie to delete.
   */
  function deleteSerie(id: number) {
    const newSeries = series.filter(serie => serie.id !== id)
    setSeries(newSeries)
    localStorage.setItem('series', JSON.stringify(newSeries))
  }

  /**
   * Retrieves a serie by its ID.
   * @param id - The ID of the serie to retrieve.
   * @returns The serie with the specified ID, or undefined if not found.
   */
  function getSerieById(id: number) {
    return series.find(serie => serie.id === id)
  }

  return {
    series,
    seriesLoaded,
    saveSerie,
    deleteSerie,
    getSerieById
  }
}
