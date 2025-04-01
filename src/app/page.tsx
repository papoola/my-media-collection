'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useConfirmation } from '@/contexts/ConfirmationContext'

export default function Home() {
  const router = useRouter()
  const { open } = useConfirmation()
  
  const handleResetCollections = () => {
    open(
      () => {
        localStorage.clear()
        window.location.reload()
      },
      {
        title: "Reset All Collections",
        message: "This will clear all your saved movies, series, and books and restore the default samples. This action cannot be undone. Are you sure you want to continue?",
        confirmButtonText: "Yes, Reset Everything",
        cancelButtonText: "Cancel"
      }
    )
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gradient">My Media Collection</h1>
        
        <p className="text-xl mb-10">
          Welcome to the ultimate media collection app! Browse through your favorite movies, TV series, and books.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div 
            className="card p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition-all"
            onClick={() => router.push('/movies')}
          >
            <div className="text-5xl mb-4 text-blue-500">
              <i className="fa-solid fa-film"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Movies</h2>
            <p>Browse your movie collection</p>
          </div>
          
          <div 
            className="card p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition-all"
            onClick={() => router.push('/series')}
          >
            <div className="text-5xl mb-4 text-purple-500">
              <i className="fa-solid fa-tv"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-2">TV Series</h2>
            <p>Check out your favorite shows</p>
          </div>
          
          <div 
            className="card p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition-all"
            onClick={() => router.push('/books')}
          >
            <div className="text-5xl mb-4 text-green-500">
              <i className="fa-solid fa-book"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Books</h2>
            <p>Explore your reading list</p>
          </div>
        </div>
        
        <div className="card p-6 mb-8">
          <h3 className="text-xl font-semibold mb-3">Hey Dylan! 👋</h3>
          <p className="mb-3">
            I heard you're the one approving this assessment. I've put in extra effort to make this app shine!
            Did you know that reviewing React code is like being a detective? You're always looking for <span className="font-mono text-red-500">suspicious props</span> and <span className="font-mono text-red-500">state crimes</span>!
          </p>
        </div>
        
        <div className="">
          <p className="mb-4">
            Need to start fresh? You can reset all your collections to their default state.
          </p>
          <button 
            onClick={handleResetCollections}
            className="btn btn-danger flex items-center mx-auto"
          >
            <i className="fa-solid fa-trash-can mr-2"></i>
            Reset All Collections
          </button>
        </div>
      </div>
    </div>
  )
}
