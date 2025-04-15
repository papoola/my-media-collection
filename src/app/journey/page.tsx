'use client'

import { useEffect } from 'react'
import { useJourney } from '@/contexts/JourneyContext'

export default function JourneyPage() {
  const { nextPage, state } = useJourney()

  useEffect(() => {
    if (state.progress === 0) {
      nextPage()
    }
  }, [nextPage, state.progress])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p>Redirecting to journey...</p>
    </div>
  )
}
