'use client'

import React from 'react'

type InputProps = {
  id: string
  name: string
  label: string
  value: string | undefined
  onChange: (name: string, value: any) => void
  required?: boolean
  readOnly?: boolean
  className?: string
  placeholder?: string
  rows?: number
}

export default function FormText({
  id,
  name,
  label,
  value = '',
  onChange,
  required = false,
  readOnly = false,
  className = '',
  placeholder = '',
  rows = 3
}: InputProps) {

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target
    onChange(name, value)
  }

  return (
    <div className={className}>
      <label className="label" htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
        required={required}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
      />
    </div>
  )
}
