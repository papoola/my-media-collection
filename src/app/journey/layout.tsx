'use client'

import { JourneyProvider } from '@/contexts/JourneyContext'

export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <JourneyProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Journey</h1>
        {children}
      </div>
    </JourneyProvider>
  )
}
