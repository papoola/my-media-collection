'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
    label: string
    icon: string
    path: string
}

export default function NavButton({
    label,
    icon,
    path,
}: Props) {

    const [hovered, setHovered] = useState<string | null>(null)
    const router = useRouter()

    return (
        <div className="flex justify-center">
            <div className="relative flex">
                <button
                    type="button"
                    className="cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-800 group"
                    onMouseOver={() => setHovered(label)}
                    onMouseOut={() => setHovered(null)}
                    onClick={() => router.push(path)}>

                    <i className={`fa-solid ${icon} fa-2xl text-gray-500 dark:text-gray-400 group-hover:text-accent dark:group-hover:text-blue-500`} />
                    <span className="sr-only">{label}</span>
                </button>
                <div role="tooltip" className={`absolute z-10 -top-10 invisible inline-block px-3 py-2 text-sm font-medium
                    text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip w-full text-center
                    dark:bg-gray-700 ${hovered === label ? 'visible opacity-100' : ''}`}>
                    {label}
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>
    )
}