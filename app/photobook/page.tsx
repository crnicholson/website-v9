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

    const NUM_COLUMNS = 5

    const columnBuckets = Array.from({ length: NUM_COLUMNS }, () => [] as ImageMetadata[])
    filteredImages.forEach((img, i) => {
        columnBuckets[i % NUM_COLUMNS].push(img)
    })

    return (
        <div className="min-h-screen bg-gray-50 p-12">
            {/* <div className="flex flex-row items-center justify-between h-fit w-full px-8 py-6 pointer-events-auto">
        <h1 className="text-sm">journey</h1>
        <Link href="/" className="text-sm hover:text-shadow-none">back</Link>
      </div> */}

            <div className="w-full flex flex-row items-center justify-between mb-12">
                <div>
                    <h1 className="font-walter text-2xl text-gray-800">
                        LEARN MORE ABOUT ME
                    </h1>
                    <p className="opacity-60">...in an incomplete photobook</p>
                </div>
                <div className="flex flex-row gap-3 flex-wrap text-xs opacity-60">
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
            </div>

            <div className="flex flex-row gap-10">
                {columnBuckets.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-10 flex-1">
                        {col.map((image) => (
                            <div key={image.filename} className="group relative">
                                <div className="relative w-full">
                                    <Image
                                        src={`/journey/${image.filename}`}
                                        alt={image.title}
                                        width={500}
                                        height={500}
                                        className="w-full h-auto"
                                    />
                                </div>

                                {image.title != "" && (
                                    <>
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

                                        {image.description && (
                                            <p className="text-xs mt-3 opacity-80">{image.description}</p>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* <div className="flex flex-row items-center justify-between h-fit w-full px-8 py-6 pointer-events-auto mt-8 border-t border-gray-300">
        <span className="text-xs text-gray-600">{filteredImages.length} images</span>
        <Link href="/" className="text-xs">charlie</Link>
      </div> */}
            <div className="w-full flex items-center justify-center mt-12 opacity-60 text-sm"><p>Done? Go back{" "}<a href="/" className="underline">home</a>.</p></div>
        </div>
    )
}
