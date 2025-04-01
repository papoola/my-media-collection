'use client'

import { useRouter } from 'next/navigation'
import { useSeries } from '@/hooks/useSeries'
import { Serie } from '@/types/serie'
import Collection from '@/components/Collection'
import Genre from '@/components/Genre'

export default function SeriesPage() {
    const { series } = useSeries()
    const router = useRouter()

    function renderSerie(serie: Serie) {
        return (
            <div 
                className="card cursor-pointer"
                onClick={() => router.push(`/series/${serie.id}`)}
            >
                {serie.poster ? (
                    <img
                        src={serie.poster}
                        alt={`${serie.title} poster`}
                        className="w-full h-64 object-cover"
                    />
                ) : (
                    <div className="bg-gray-200 h-64 flex items-center justify-center">
                        <i className="fa-solid fa-tv text-gray-400 text-6xl"></i>
                    </div>
                )}
            
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 min-h-16">{serie.title}</h2>

                    <div className="flex justify-between mb-2 text-gray-600">
                        <div className="flex items-center">
                            <i className="fa-solid fa-calendar-alt mr-2"></i>
                            <span>{serie.year}</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fa-solid fa-star text-yellow-400 mr-2"></i>
                            <span>{serie.rating}</span>
                        </div>
                    </div>

                    <Genre genre={serie.genre} />
                </div>
            </div>
        )
    }

    return (
        <Collection<Serie>
            icon="fa-tv"
            title="Series Collection"
            items={series}
            newItemPath="/series/new"
            renderItem={renderSerie}
        />
    )
}