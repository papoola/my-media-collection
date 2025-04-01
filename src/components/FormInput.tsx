'use client'

import React from 'react'

type InputProps = {
  id: string
  name: string
  label: string
  value: string | number | undefined
  onChange: (name: string, value: any) => void
  type?: 'text' | 'number' | 'url' | 'email'
  required?: boolean
  readOnly?: boolean
  min?: number
  max?: number
  step?: number
  className?: string
  placeholder?: string
}

export default function FormInput({
  id,
  name,
  label,
  value = '',
  onChange,
  type = 'text',
  required = false,
  readOnly = false,
  min,
  max,
  step,
  className = '',
  placeholder = '',
}: InputProps) {

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target
    // Convert to number if the input type is number
    const processedValue = (type === 'number' && value !== '') ? Number(value) : value
    onChange(name, processedValue)
  }

  return (
    <div className={className}>
      <label className="label" htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
        required={required}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  )
}
