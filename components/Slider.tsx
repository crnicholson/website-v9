'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import Image from 'next/image';

interface Project {
    id: number;
    image: string;
    title: string;
}

const PROJECTS: Project[] = [
    { id: 1, image: '/projects/bioplastic.avif', title: '' },
    { id: 2, image: '/projects/bioplastic.avif', title: '' },
    { id: 3, image: '/projects/bioplastic.avif', title: '' },
    { id: 4, image: '/projects/bioplastic.avif', title: '' },
    { id: 5, image: '/projects/bioplastic.avif', title: '' },
    { id: 6, image: '/projects/bioplastic.avif', title: '' },
];

const DRAG_MULTIPLIER = 2;
const SCROLL_SECTIONS = 3;

export default function Slider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const infiniteProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = containerRef.current.scrollWidth / SCROLL_SECTIONS;
        }
    }, []);

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartX(e.pageX - (containerRef.current?.offsetLeft ?? 0));
        setScrollLeft(containerRef.current?.scrollLeft ?? 0);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * DRAG_MULTIPLIER;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleScroll = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scrollWidth = container.scrollWidth;
        const scrollPosition = container.scrollLeft;
        const sectionWidth = scrollWidth / SCROLL_SECTIONS;

        if (scrollPosition <= 0) {
            container.scrollLeft = sectionWidth;
        } else if (scrollPosition >= sectionWidth * 2) {
            container.scrollLeft = sectionWidth;
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col overflow-hidden select-none">
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onScroll={handleScroll}
                    className="flex gap-6 overflow-x-auto px-12 py-16 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden "
                    style={{
                        perspective: '2000px',
                        perspectiveOrigin: 'center center',
                    }}
                >
                    {infiniteProjects.map((project, index) => (
                        <div
                            key={`${project.id}-${index}`}
                            className="shrink-0 transform-3d"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={200}
                                height={200}
                                className="overflow-hidden object-cover skew-y-30"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}