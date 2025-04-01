'use client'

import { useState, useEffect } from 'react'
import Genre from './Genre'

interface Props {
  id: string
  name: string
  label: string
  value: string[]
  onChange: (name: string, value: string[]) => void
  required?: boolean
  className?: string
  availableGenres: string[]
}

export default function GenreInput({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  className = '',
  availableGenres
}: Props) {

  const [selectedGenre, setSelectedGenre] = useState<string>('')
  
  function addGenre(e: React.ChangeEvent<HTMLSelectElement>) {
    const genre = e.target.value
    if (!genre) return
    
    // Only add if not already in the list
    if (!value.includes(genre)) {
      const arrayValue = [...value, genre]
      onChange(name, arrayValue)
    }
    setSelectedGenre('')
  }
  
  function removeGenre(genreToRemove: string) {
    const arrayValue = value.filter(genre => genre !== genreToRemove)
    onChange(name, arrayValue)
  }

  return (
    <div className={className}>
      <label className="label" htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <Genre 
          genre={value} 
          className={value.length > 0 ? "mb-2" : ""}
          onRemove={removeGenre}
        />
      
      <select
        id={id}
        name={name}
        value={selectedGenre}
        onChange={addGenre}
        className="form-input h-10"
        required={required && value.length === 0}
      >
        <option value="">Add a genre</option>
        {availableGenres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  )
}
