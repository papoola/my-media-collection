'use client'

import { useConfirmation } from "@/contexts/ConfirmationContext"

export default function ConfirmationDialog() {

  const {
    isOpen,
    options,
    close,
    confirm
  } = useConfirmation()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{options.title}</h2>
        <p className="mb-6">{options.message}</p>
        <div className="flex justify-end gap-4">
          <button 
            onClick={close}
            className="btn btn-secondary"
          >
            {options.cancelButtonText}
          </button>
          <button 
            onClick={confirm}
            className="btn btn-danger"
          >
            {options.confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}
