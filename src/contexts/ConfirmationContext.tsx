'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

interface ConfirmationOptions {
  title?: string
  message?: string
  confirmButtonText?: string
  cancelButtonText?: string
}

interface ConfirmationContextType {
  isOpen: boolean
  options: ConfirmationOptions
  open: (callback: () => void, customOptions?: ConfirmationOptions) => void
  close: () => void
  confirm: () => void
}

const defaultOptions: ConfirmationOptions = {
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel'
}

const ConfirmationContext = createContext<ConfirmationContextType | null>(null)

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmationOptions>(defaultOptions)
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {})

  const open = (callback: () => void, customOptions?: ConfirmationOptions) => {
    setOnConfirm(() => callback)
    setOptions({ ...defaultOptions, ...customOptions })
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const confirm = () => {
    onConfirm()
    close()
  }

  return (
    <ConfirmationContext.Provider
      value={{
        isOpen,
        options,
        open,
        close,
        confirm
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  )
}

export function useConfirmation() {
  const context = useContext(ConfirmationContext)
  
  if (!context) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider')
  }
  
  return context
}
