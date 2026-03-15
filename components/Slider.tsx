'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Project {
    id: number | string;
    type?: 'menu' | 'project';
    image?: string;
    name?: string;
    about?: string;
    link?: string;
}

const PROJECTS: Project[] = [
    { id: 'menu', type: 'menu' },
    { id: 1, image: '/projects/bioplastic.avif', name: 'SEAWEED BIOPLASTIC', about: 'During summer 2023, I created custom bioplastics from seaweed and made a detailed journal of all my experiments.', link: 'https://nicholsonlabs.gitbook.io/labs/bioplastic' },
    { id: 5, image: '/projects/stratoSoarMK2.png', name: 'STRATOSOAR', about: 'This is my main and largest project, taking place over the course of 3 and a half years. StratoSoar is a low-cost, lightweight UAV designed for deployment from weather balloons. It flies autonomously to GPS coordinates, providing an affordable alternative to conventional UAVs for educators, researchers, and hobbyists.', link: 'https://github.com/crnicholson/StratoSoar-MK3' },
    // { id: 6, image: '/projects/hamClub.png', title: '' },
    { id: 4, image: '/projects/carbon.jpeg', name: 'DIY CARBON CAPTURE', about: 'I developed one of the first at-home implementations of carbon capture technology using readily available materials, then made a complete guide to make your own.', link: 'https://nicholsonlabs.gitbook.io/labs/carbon-capture' },
    { id: 7, image: '/projects/outfits.png', name: 'OUTFIT GENERATOR', about: 'I often find it annoying to create an outfit before school, so I made a tool that lets me view my wardrobe and randomize outfits.', link: 'https://outfits.crnicholson.com' },
    { id: 12, image: '/projects/woodworks.jpeg', name: 'WOODWORKING BUSINESS', about: 'For three years, I developed my own woodworking business, selling handmade and carved crafts. I profited over $2000 and opened an Etsy store before closing it to focus on other projects.', link: 'https://cochituatewoodworks.wixsite.com/website-2' },
    // { id: 8, image: '/projects/fonts.png', name: 'FONTS', about: 'Finding display fonts is hard, so I made a collection for mainly my personal use.', link: 'https://fonts.crnicholson.com' },
    // { id: 3, image: '/projects/beantown.jpeg', name: 'CV RESISTOR DETECTOR', about: 'This won first place at the 2023 Beantown Bash Hackathon. It uses OpenCV to categorize the colors of the bands on a resistor to determine the value of it.', link: 'https://github.com/mpkendall/resistorfinder' },
    { id: 2, image: '/projects/apex.png', name: 'APEX', about: 'I was a lead organizer for Apex, a 3-month-long hackathon culminating in a launch of 15 student projects into near space on a high-altitude weather balloon. We managed to raise over $15,000 and allowed novel hardware projects to be launched.', link: 'https://apex.hackclub.com' },
    { id: 9, image: '/projects/hackfinger.gif', name: 'NERVE CONTROLLED FINGER', about: 'I developed a custom circuit for processing nerve signals along with a custom finger to display the signals.' },
    { id: 10, image: '/projects/v3.png', name: 'V3 WEBSITE', about: `I'm passionate that the web is becoming an increasingly mundane and boring world where we have to learn about people through text on a screen. As an auxillary personal website, I developed a website that allows people to experience who I really am.`, link: 'https://v3.crnicholson.com' },
    { id: 13, image: '/projects/softrobotics.png', name: 'SOFT ROBOTICS', about: `I designed a series of novel silicone-based soft robotic grippers.` },
    { id: 14, image: '/projects/foldingglider.png', name: 'FOLDING GLIDER', about: `I designed a glider laser cut from one flat peice of cardboard to fold into a flying wing shape with correct airfoil geometry. I also designed a parametric design software that calculated all the parameters for the laser cutter based on the weight and cardboard density.` },
    { id: 15, image: '/projects/soldering.png', name: 'SOLDERING STATION', about: `I designed an 8-foot long fully-custom soldering and electronics workbench right next to my bed!` },
    // { id: 11, image: '/projects/littleLora.png', title: '' },
];


const IMAGE_GAP = 200;
const SCROLL_SPEED = -3;
const IMAGE_WIDTH = 400; // doesn't really matter
const IMAGE_HEIGHT = 500;
const BACKGROUND_SVG_SCROLL_SPEED = -1.5;
const BACKGROUND_TEXT_SCROLL_SPEED = -0.9;

export default function Slider({ onAboutClick, onSocialsClick }: { onAboutClick: () => void; onSocialsClick: () => void }) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const backgroundSvgRef = useRef<HTMLDivElement>(null);
    const backgroundTextRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, scrollPos: 0 });
    const animationRef = useRef<number>(null);
    const [backgroundImageWidth, setBackgroundImageWidth] = useState(1000);
    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hasDragged, setHasDragged] = useState(false);

    const multipliedProjects = Array(20).fill(PROJECTS).flat();

    useEffect(() => {
        const img = new window.Image();
        img.src = '/face.svg';
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const screenHeight = window.innerHeight;
            const scaledWidth = screenHeight * aspectRatio;
            setBackgroundImageWidth(scaledWidth + 400);
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
        setHasDragged(false);
        setDragStart({ x: e.clientX, scrollPos: position });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const delta = e.clientX - dragStart.x;
        if (Math.abs(delta) > 5) {
            setHasDragged(true);
        }
        setPosition(dragStart.scrollPos - delta * 2);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleProjectClick = (project: Project, e: React.MouseEvent) => {
        if (!hasDragged && project.link) {
            window.open(project.link, '_blank', 'noopener,noreferrer');
        }
    };

    const handleProjectMouseEnter = (project: Project, e: React.MouseEvent) => {
        if (project.about || project.link) {
            setHoveredProject(project);
            setMousePosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleProjectMouseMove = (e: React.MouseEvent) => {
        if (hoveredProject) {
            setMousePosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleProjectMouseLeave = () => {
        setHoveredProject(null);
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

            if (backgroundSvgRef.current && backgroundImageWidth > 0) {
                const backgroundPosition = position * BACKGROUND_SVG_SCROLL_SPEED;
                let normalizedBgPosition = backgroundPosition % backgroundImageWidth;
                if (normalizedBgPosition > 0) {
                    normalizedBgPosition -= backgroundImageWidth;
                }
                backgroundSvgRef.current.style.transform = `translateX(${normalizedBgPosition}px)`;
            }

            if (backgroundTextRef.current && backgroundImageWidth > 0) {
                const backgroundPosition = position * BACKGROUND_TEXT_SCROLL_SPEED;
                let normalizedBgPosition = backgroundPosition % backgroundImageWidth;
                if (normalizedBgPosition > 0) {
                    normalizedBgPosition -= backgroundImageWidth;
                }
                backgroundTextRef.current.style.transform = `translateX(${normalizedBgPosition}px)`;
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
                    ref={backgroundSvgRef}
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
                            <Image
                                src="/face.svg"
                                alt="Background"
                                className="object-cover opacity-5 h-screen w-auto"
                                width={500}
                                height={500}
                            />
                        </div>
                    ))}
                </div>

                <div
                    ref={backgroundTextRef}
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
                            {/* <h1 className="absolute inset-0 text-[100vh] opacity-5 tracking-tight">charlie</h1> */}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex items-end justify-center overflow-hidden relative z-10 h-full">
                <div
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="w-full overflow-hidden pt-16 h-fit"
                // style={{ transform: "perspective(1143px) rotateY(-50deg) skewY(20deg)", willChange: "transform" }}
                >
                    {/* <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/0 z-10 pointer-events-none"></div> */}
                    <div
                        ref={trackRef}
                        className="flex items-end"
                        style={{
                            gap: `${IMAGE_GAP}px`,
                        }}
                    >
                        {multipliedProjects.map((project, index) => (
                            <div
                                key={`${project.id}-${index}`}
                                className={`shrink-0 pointer-events-auto opacity-100`}
                                style={{
                                    height: `${IMAGE_HEIGHT}px`,
                                    willChange: "transform"
                                }}
                                onMouseEnter={(e) => project.type !== 'menu' && handleProjectMouseEnter(project, e)}
                                onMouseMove={project.type !== 'menu' ? handleProjectMouseMove : undefined}
                                onMouseLeave={project.type !== 'menu' ? handleProjectMouseLeave : undefined}
                                onClick={(e) => project.type !== 'menu' && handleProjectClick(project, e)}
                            >
                                {project.type === 'menu' ? (
                                    <div className="w-full h-full bg-white p-6 min-w-sm max-w-md z-50 font-walter text-xl">
                                        <h1 className="text-2xl mb-4">TABLE OF CONTENTS</h1>
                                        <div className="flex flex-col gap-2">
                                            {/* <div className="flex flex-row justify-between items-center w-full h-fit">
                                                <a href="/">1. HOME</a>
                                                <h1>→</h1>
                                            </div> */}
                                            <div className="flex flex-row justify-between items-center w-full h-fit">
                                                <a href="/photobook">1. MORE PROJECTS + VISUAL JOURNEY THROUGH MY MAKING</a>
                                                <h1>→</h1>
                                            </div>
                                            <div className="flex flex-row justify-between items-center w-full h-fit">
                                                <a onClick={onAboutClick}>2. ABOUT</a>
                                                <h1>→</h1>
                                            </div>
                                            <div className="flex flex-row justify-between items-center w-full h-fit">
                                                <a href="/cv">3. EXPERIENCES + SKILLS</a>
                                                <h1>→</h1>
                                            </div>
                                            <div className="flex flex-row justify-between items-center w-full h-fit">
                                                <a onClick={onSocialsClick}>4. SOCIALS</a>
                                                <h1>→</h1>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-row justify-between items-center w-full h-fit font-walter text-shadow-none">
                                            <h1 className="text-xs">{project.name}</h1>
                                            <h1 className="text-xs">→</h1>
                                        </div>
                                        {project.image && (
                                            <Image
                                                src={project.image}
                                                alt={project.name || 'Project'}
                                                width={IMAGE_WIDTH}
                                                height={IMAGE_HEIGHT}
                                                className="overflow-hidden object-cover w-full h-full pointer-events-none"
                                                draggable={false}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {hoveredProject && (hoveredProject.about || hoveredProject.link) && (
                <div
                    className="fixed z-50 pointer-events-none"
                    style={{
                        left: `${mousePosition.x + 20}px`,
                        top: `${mousePosition.y + 20}px`,
                        transform: 'translate(0, 0)',
                    }}
                >
                    <div className="bg-white border border-black shadow-lg p-4 max-w-sm text-shadow-none">
                        <h2 className="font-walter text-xs mb-2">{hoveredProject.name}</h2>
                        {hoveredProject.about && (
                            <p className="text-xs leading-relaxed">{hoveredProject.about}</p>
                        )}
                        {hoveredProject.link && (
                            <p className="text-xs mt-2 opacity-60">(click anywhere to view project)</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}