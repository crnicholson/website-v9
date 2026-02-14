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

const IMAGE_GAP = 0;
const SCROLL_SPEED = 0.75;
const IMAGE_WIDTH = 180;
const BACKGROUND_SCROLL_SPEED = -0.5;

export default function Slider() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, scrollPos: 0 });
    const animationRef = useRef<number>(null);
    const [backgroundImageWidth, setBackgroundImageWidth] = useState(1000);

    const multipliedProjects = Array(20).fill(PROJECTS).flat();

    useEffect(() => {
        const img = new window.Image();
        img.src = '/charlie.png';
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const screenHeight = window.innerHeight;
            const scaledWidth = screenHeight * aspectRatio;
            setBackgroundImageWidth(scaledWidth);
        };
    }, []);

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

            let normalizedPosition = position % singleSetWidth;
            if (normalizedPosition < 0) {
                normalizedPosition += singleSetWidth;
            }

            trackRef.current.style.transform = `translateX(-${normalizedPosition}px)`;

            if (backgroundRef.current && backgroundImageWidth > 0) {
                const backgroundPosition = position * BACKGROUND_SCROLL_SPEED;
                let normalizedBgPosition = backgroundPosition % backgroundImageWidth;
                if (normalizedBgPosition > 0) {
                    normalizedBgPosition -= backgroundImageWidth;
                }

                backgroundRef.current.style.transform = `translateX(${normalizedBgPosition}px)`;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [position, backgroundImageWidth]);

    return (
        <div className="flex flex-col overflow-hidden select-none relative h-screen">
            <div className="absolute inset-0 overflow-hidden h-full w-full">
                <div
                    ref={backgroundRef}
                    className="absolute flex h-full transform top-0 left-0"
                >
                    {Array(30).fill(null).map((_, i) => (
                        <div
                            key={i}
                            className="relative shrink-0"
                            style={{
                                height: '100vh',
                                width: `${backgroundImageWidth}px`,
                            }}
                        >
                            {/* <Image
                                src="/charlie.png"
                                alt="Background"
                                fill
                                className="object-cover"
                                sizes="100vw"
                            /> */}
                            <h1 className="text-[100vh] opacity-2.5 text-shadow-none">charlie</h1>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-hidden relative z-10">
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
                                className="shrink-0 pointer-events-none h-fit opacity-100"
                                style={{ transform: "perspective(1143px) rotateY(-50deg) skewY(20deg)", willChange: "transform" }}
                            >
                                <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/50 z-10 pointer-events-none"></div>

                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={IMAGE_WIDTH}
                                    height={IMAGE_WIDTH}
                                    className="overflow-hidden h-auto"
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