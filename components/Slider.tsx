'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Project {
    id: number;
    image: string;
    title: string;
}

const PROJECTS: Project[] = [
    { id: 1, image: '/projects/bioplastic.avif', title: '' },
    { id: 2, image: '/projects/apex.png', title: '' },
    { id: 3, image: '/projects/beantown.jpeg', title: '' },
    { id: 4, image: '/projects/carbon.jpeg', title: '' },
    { id: 5, image: '/projects/stratosoarMK2.png', title: '' },
    { id: 6, image: '/projects/hamClub.png', title: '' },
];

const IMAGE_GAP = 30;
const SCROLL_SPEED = 0.75; 
const IMAGE_WIDTH = 200;

export default function Slider() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, scrollPos: 0 });
    const animationRef = useRef<number>(null);

    const multipliedProjects = Array(20).fill(PROJECTS).flat();

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            setPosition((prev) => prev + e.deltaY * SCROLL_SPEED);
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, scrollPos: position });
        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grabbing';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const delta = e.clientX - dragStart.x;
        setPosition(dragStart.scrollPos - delta * 2);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grab';
        }
    };

    useEffect(() => {
        const animate = () => {
            if (!trackRef.current) return;

            const singleSetWidth = PROJECTS.length * (IMAGE_WIDTH + IMAGE_GAP);

            // Reset position when we've scrolled one full set
            let normalizedPosition = position % singleSetWidth;
            if (normalizedPosition < 0) {
                normalizedPosition += singleSetWidth;
            }

            trackRef.current.style.transform = `translateX(-${normalizedPosition}px)`;
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [position]);

    return (
        <div className="flex flex-col overflow-hidden select-none">
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="w-full overflow-hidden cursor-grab py-16"
                    style={{
                        perspective: '2000px',
                        perspectiveOrigin: 'center center',
                    }}
                >
                    <div
                        ref={trackRef}
                        className="flex"
                        style={{
                            gap: `${IMAGE_GAP}px`,
                        }}
                    >
                        {multipliedProjects.map((project, index) => (
                            <div
                                key={`${project.id}-${index}`}
                                className="shrink-0 pointer-events-none transform-3d perspective-[1400px] perspective-origin-right"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={IMAGE_WIDTH}
                                    height={IMAGE_WIDTH}
                                    className="overflow-hidden h-auto skew-y-12 -rotate-y-44 -rotate-x-6"
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}