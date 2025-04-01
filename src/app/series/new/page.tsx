'use client'

import { Serie } from '@/types/serie'
import EditSerie from '@/components/EditSerie'

export default function NewSeriePage() {
  const serie: Serie = {
    id: 0,
    title: '',
    year: 0,
    rating: 0,
    genre: [],
    description: '',
    imdbUrl: '',
    poster: ''
  }

  return (
    <EditSerie title="New Serie" serie={serie} />
  )
}
