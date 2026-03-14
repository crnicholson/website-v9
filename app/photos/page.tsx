'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

export interface JourneyItem {
    filename: string
    title: string
    caption?: string
    date: string
}

export const journeyItems: JourneyItem[] = [
    {
        filename: 'oldDesk.jpeg',
        title: 'Old Desk',
        caption: 'yo whats good gang',
        date: '2021-01-01',
    },
    {
        filename: 'arduino.jpeg',
        title: 'Arduino',
        caption: '',
        date: '2021-06-01',
    },
    {
        filename: 'hamRadioRoof.jpeg',
        title: 'Ham Radio on Roof',
        caption: '',
        date: '2022-01-01',
    },
    {
        filename: 'meWithRadioAndTV.jpeg',
        title: 'Me with Radio and TV',
        caption: '',
        date: '2022-03-01',
    },
    {
        filename: 'newbs.jpeg',
        title: 'Newbs',
        caption: '',
        date: '2022-06-01',
    },
    {
        filename: 'balloon.jpeg',
        title: 'Balloon',
        caption: '',
        date: '2022-09-01',
    },
    {
        filename: 'scrubber.jpeg',
        title: 'CO2 Scrubber',
        caption: '',
        date: '2023-01-01',
    },
    {
        filename: 'moistureSwing.png',
        title: 'Moisture Swing',
        caption: '',
        date: '2023-03-01',
    },
    {
        filename: 'respirator.jpeg',
        title: 'Respirator',
        caption: '',
        date: '2023-05-01',
    },
    {
        filename: 'drugs.jpeg',
        title: 'Drugs',
        caption: '',
        date: '2023-07-01',
    },
    {
        filename: 'sodaStream.jpeg',
        title: 'SodaStream',
        caption: '',
        date: '2023-09-01',
    },
    {
        filename: 'softRobot.jpeg',
        title: 'Soft Robot',
        caption: '',
        date: '2023-11-01',
    },
    {
        filename: 'fusion.png',
        title: 'Fusion 360 Design',
        caption: '',
        date: '2024-01-01',
    },
    {
        filename: 'wing.png',
        title: 'Wing Design',
        caption: '',
        date: '2024-03-01',
    },
    {
        filename: 'glider.png',
        title: 'Glider',
        caption: '',
        date: '2024-05-01',
    },
    {
        filename: 'stratoSoarMK1.jpeg',
        title: 'StratoSoar MK1',
        caption: '',
        date: '2024-07-01',
    },
    {
        filename: 'cutdownMechanism.png',
        title: 'Cutdown Mechanism',
        caption: '',
        date: '2024-09-01',
    },
    {
        filename: 'stratoSoarMK2.png',
        title: 'StratoSoar MK2',
        caption: '',
        date: '2024-11-01',
    },
    {
        filename: 'meWithGlider.jpeg',
        title: 'Me with Glider',
        caption: '',
        date: '2025-01-01',
    },
]

const CARD_GAP = 28
const CARD_HEIGHT = 280
const SCROLL_SPEED = 1.05

function formatDate(iso: string) {
    const d = new Date(`${iso}T00:00:00`)
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function yearOf(iso: string) {
    return iso.slice(0, 4)
}

export default function Photos() {
    const sorted = [...journeyItems].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const scrubRef = useRef<HTMLDivElement>(null)

    const [scrollY, setScrollY] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)

    const [draggingCards, setDraggingCards] = useState(false)
    const [dragStartY, setDragStartY] = useState(0)
    const [dragStartScroll, setDragStartScroll] = useState(0)

    const [scrubbing, setScrubbing] = useState(false)

    const clamp = useCallback(
        (v: number) => Math.max(0, Math.min(v, maxScroll)),
        [maxScroll]
    )

    useEffect(() => {
        const update = () => {
            if (!trackRef.current || !containerRef.current) return
            const next = Math.max(0, trackRef.current.scrollHeight - containerRef.current.clientHeight)
            setMaxScroll(next)
            setScrollY((prev) => Math.max(0, Math.min(prev, next)))
        }

        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    useEffect(() => {
        const node = containerRef.current
        if (!node) return

        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            setScrollY((prev) => clamp(prev + e.deltaY * SCROLL_SPEED))
        }

        node.addEventListener('wheel', onWheel, { passive: false })
        return () => node.removeEventListener('wheel', onWheel)
    }, [clamp])

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (draggingCards) {
                const delta = e.clientY - dragStartY
                setScrollY(clamp(dragStartScroll - delta * 1.25))
            }

            if (scrubbing && scrubRef.current) {
                const rect = scrubRef.current.getBoundingClientRect()
                const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
                setScrollY(clamp(maxScroll * ratio))
            }
        }

        const onUp = () => {
            setDraggingCards(false)
            setScrubbing(false)
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)

        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
        }
    }, [draggingCards, clamp, dragStartY, dragStartScroll, scrubbing, maxScroll])

    const handleCardDragStart = (e: ReactMouseEvent<HTMLDivElement>) => {
        setDraggingCards(true)
        setDragStartY(e.clientY)
        setDragStartScroll(scrollY)
    }

    const handleScrubStart = (e: ReactMouseEvent<HTMLDivElement>) => {
        setScrubbing(true)
        if (!scrubRef.current) return
        const rect = scrubRef.current.getBoundingClientRect()
        const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
        setScrollY(clamp(maxScroll * ratio))
    }

    const progress = maxScroll > 0 ? scrollY / maxScroll : 0
    const years = [...new Set(sorted.map((item) => yearOf(item.date)))]

    const jumpToYear = (year: string) => {
        const index = sorted.findIndex((item) => yearOf(item.date) === year)
        if (index < 0) return
        const approx = index * (CARD_HEIGHT + CARD_GAP)
        setScrollY(clamp(approx))
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 flex">
            <div className="flex-1">
                <div
                    ref={containerRef}
                    className="relative flex-1 overflow-hidden px-8 py-12"
                    style={{ height: 'calc(100vh - 70px)' }}
                    onMouseDown={handleCardDragStart}
                >
                    <div
                        ref={trackRef}
                        className="flex flex-col gap-16"
                        style={{
                            transform: `translateY(${-scrollY}px)`,
                            transition: draggingCards || scrubbing ? 'none' : 'transform 0.06s linear',
                            willChange: 'transform',
                        }}
                    >
                        <div className="flex flex-col items-center justify-center min-h-screen text-center w-full max-w-4xl mx-auto">
                            <h1 className="text-5xl mb-6">My Journey Through Creating</h1>
                            <p className="text-gray-800 max-w-lg">A collection of photos to show some large and small steps in becoming who I am today as a maker.</p>
                            <div className="mt-20 text-xs uppercase tracking-widest opacity-60">Scroll down ↓</div>
                        </div>

                        {sorted.map((item, index) => (
                            <JourneyCard
                                key={item.filename}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <aside className="w-20 shrink-0 border-l border-gray-200 px-3 py-6 flex flex-col items-center">
                <div className="flex flex-col gap-2 text-xs text-gray-800">
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => jumpToYear(year)}
                            className="hover:text-gray-700"
                            type="button"
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* <div className="w-full flex flex-col items-center gap-2">
                    <div
                        ref={scrubRef}
                        onMouseDown={handleScrubStart}
                        className="relative h-40 w-3 border border-gray-300 rounded-full"
                    >
                        <div
                            className="absolute left-1/2 -translate-x-1/2 h-3 w-3 bg-gray-300 rounded-full"
                            style={{ top: `calc(${progress * 100}% - 4px)` }}
                        />
                    </div>
                    <span className="text-xs text-gray-800">scroll</span>
                </div> */}
            </aside>
        </div>
    )
}

interface CardProps {
    item: JourneyItem
    index: number
}

function JourneyCard({ item, index }: CardProps) {
    const [imgError, setImgError] = useState(false)
    const isEven = index % 2 === 0

    return (
        <div className="grid grid-cols-2 gap-12 w-full max-w-4xl mx-auto items-center">
            <div className={`flex flex-col ${isEven ? 'items-end' : 'items-end text-right'}`}>
                {isEven ? (
                    <div className="overflow-hidden inline-flex">
                        {!imgError ? (
                            <img
                                src={`/journey/${item.filename}`}
                                alt={item.title}
                                onError={() => setImgError(true)}
                                draggable={false}
                                className="h-70 w-auto max-w-full object-contain"
                            />
                        ) : (
                            <div className="w-64 h-70 flex items-center justify-center text-gray-300 text-xs bg-gray-100">
                                {item.filename}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 max-w-sm">
                        <div className="flex items-baseline justify-end gap-3 flex-row-reverse">
                            <span className="text-xs opacity-60 whitespace-nowrap">{formatDate(item.date)}</span>
                            <h3 className="text-sm font-walter uppercase tracking-wide">{item.title}</h3>
                        </div>
                        {item.caption && <p className="text-sm text-gray-800 leading-relaxed">{item.caption}</p>}
                    </div>
                )}
            </div>

            <div className={`flex flex-col ${!isEven ? 'items-start' : 'items-start text-left'}`}>
                {!isEven ? (
                    <div className="overflow-hidden inline-flex">
                        {!imgError ? (
                            <img
                                src={`/journey/${item.filename}`}
                                alt={item.title}
                                onError={() => setImgError(true)}
                                draggable={false}
                                className="h-70 w-auto max-w-full object-contain"
                            />
                        ) : (
                            <div className="w-64 h-70 flex items-center justify-center text-gray-300 text-xs bg-gray-100">
                                {item.filename}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 max-w-sm">
                        <div className="flex items-baseline gap-3">
                            <span className="text-xs opacity-60 whitespace-nowrap">{formatDate(item.date)}</span>
                            <h3 className="text-sm font-walter uppercase tracking-wide">{item.title}</h3>
                        </div>
                        {item.caption && <p className="text-sm text-gray-800 leading-relaxed">{item.caption}</p>}
                    </div>
                )}
            </div>
        </div>
    )
}
