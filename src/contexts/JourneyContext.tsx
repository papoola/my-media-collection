'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'


// state
interface JourneyState {
  progress: number
  message: string
}

// context type
interface JourneyContextType {
  state: JourneyState
  updateState: (newState: Partial<JourneyState>) => void
  nextPage: () => void
  restartJourney: () => void
}

const routes: Record<number, string> = {
  0: '/journey',
  1: '/journey/page-1',
  2: '/journey/page-2',
  3: '/journey/page-3'
}

// context
const JourneyContext = createContext<JourneyContextType | undefined>(undefined)

// provider
export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<JourneyState>({
    progress: 0,
    message: '',
  })


  const router = useRouter()


  /**
   * Update the journey state
   * @param newState - Partial state to update
   */
  function updateState(newState: Partial<JourneyState>) {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }))
  }


  /**
   * Go to the next page
   */
  function nextPage() {
    updateState({ progress: state.progress + 1 })
    router.push(routes[state.progress + 1])
  }  


  /**
   * Restart the journey
   */
  function restartJourney() {
    updateState({ progress: 0, message: '' })
    router.push(routes[0])
  }


  // If page is reloaded, restart journey
  useEffect(() => {
    if (state.progress === 0) {
      restartJourney()
    }
  }, [state.progress])


  return (
    <JourneyContext.Provider value={{ state, updateState, nextPage, restartJourney }}>
      {children}
    </JourneyContext.Provider>
  )
}


// hook
export function useJourney() {
  const context = useContext(JourneyContext)
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider')
  }
  return context
}
