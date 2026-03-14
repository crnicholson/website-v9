'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ImageMetadata {
    filename: string
    title: string
    date: string
    description?: string
}

export default function PinterestPage() {
    const [images, setImages] = useState<ImageMetadata[]>([])
    const [selectedYear, setSelectedYear] = useState<string | null>(null)
    const [years, setYears] = useState<string[]>([])

    useEffect(() => {
        const fetchMetadata = async () => {
            const response = await fetch('/journey/metadata.json')
            const data: ImageMetadata[] = await response.json()

            const sorted = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            setImages(sorted)

            const uniqueYears = Array.from(new Set(sorted.map(img => new Date(img.date).getFullYear().toString())))
                .sort((a, b) => parseInt(a) - parseInt(b))
            setYears(uniqueYears)
        }

        fetchMetadata()
    }, [])

    const filteredImages = selectedYear
        ? images.filter(img => new Date(img.date).getFullYear().toString() === selectedYear)
        : images

    return (
        <div className="min-h-screen bg-gray-50">
            {/* <div className="flex flex-row items-center justify-between h-fit w-full px-8 py-6 pointer-events-auto">
        <h1 className="text-sm">journey</h1>
        <Link href="/" className="text-sm hover:text-shadow-none">back</Link>
      </div> */}

            <div className="px-12 pt-12 flex flex-row gap-3 flex-wrap text-xs">
                <button
                    onClick={() => setSelectedYear(null)}
                    className={`${selectedYear === null
                            ? 'underline'
                            : ''
                        }`}
                >
                    All
                </button>
                {years.map(year => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={` ${selectedYear === year
                                ? 'underline'
                                : ''
                            }`}
                    >
                        {year}
                    </button>
                ))}
            </div>

            <div className="px-12 py-12">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-5 gap-10 space-y-10">
                    {filteredImages.map((image) => (
                        <div
                            key={image.filename}
                            className="break-inside-avoid group relative"
                        >
                            <div className="relative w-full">
                                <Image
                                    src={`/journey/${image.filename}`}
                                    alt={image.title}
                                    width={500}
                                    height={500}
                                    className="w-full h-auto"
                                />

                                {/* {image.description && (
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                    <p className="text-white text-sm text-center">{image.description}</p>
                  </div>
                )} */}
                            </div>

                            <div className="mt-3 flex flex-row items-center justify-between gap-2">
                                <h3 className="font-walter text-xs uppercase">{image.title}</h3>
                                <p className="text-[11px] opacity-60">
                                    {new Date(image.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="flex flex-row items-center justify-between h-fit w-full px-8 py-6 pointer-events-auto mt-8 border-t border-gray-300">
        <span className="text-xs text-gray-600">{filteredImages.length} images</span>
        <Link href="/" className="text-xs">charlie</Link>
      </div> */}
        </div>
    )
}
