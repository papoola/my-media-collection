'use client'

import { useJourney } from '@/contexts/JourneyContext'

export default function Page1() {
  const { nextPage, state, updateState } = useJourney()

  function setSampleState() {
    updateState({
      message: 'Message set by page 1'
    })
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Page-1</h1>
      
      <div className="mb-6">
        <p className="text-gray-700">
          Current message: {state.message}
        </p>
        <button
          onClick={setSampleState}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Set Sample State
        </button>
      </div>
      
      <button
        onClick={nextPage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Next page
      </button>
    </div>
  )
}
