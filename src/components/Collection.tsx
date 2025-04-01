'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Movie } from '@/types/movie'
import { Serie } from '@/types/serie'
import { Book } from '@/types/book'

type Item = Movie | Serie | Book

interface Props<T extends Item> {
    icon: string
    title: string
    items: T[]
    newItemPath: string
    renderItem: (item: T) => React.ReactNode
    onDelete?: (id: number) => void
}

export default function Collection<T extends Item>({ 
    icon, 
    title, 
    items, 
    newItemPath, 
    renderItem 
}: Props<T>) {
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredItems, setFilteredItems] = useState<T[]>([])

    useEffect(() => {
        const filtered = (searchQuery.length > 0) 
            ? items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())) 
            : [...items]
        
        setFilteredItems(filtered)
    }, [searchQuery, items])

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 flex items-center">
                <i className={`fa-solid ${icon} mr-5 text-2xl`}></i>
                {title}
            </h1>

            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                        <i className="fa-solid fa-search text-gray-500"></i>
                    </div>
                    <input
                        type="search"
                        className="block w-full p-4 pl-12 text-sm border rounded-lg"
                        placeholder={`Search ${title}...`}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                        }}
                    />
                </div>
                <div className="flex items-center">
                    <Link
                        href={newItemPath}
                        className="btn btn-primary"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>
                        Add New
                    </Link>
                </div>
            </div>            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <div key={item.id}>
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        </div>
    )
}