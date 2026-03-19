'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MobileNavProps {
    onAboutClick: () => void;
}

export default function MobileNav({ onAboutClick }: MobileNavProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-gray-50 border-b z-40 md:hidden">
                <div className="flex items-center justify-between px-4 py-4">
                    <Link href="/" className="font-walter text-lg">
                        charlie
                    </Link>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 hover:bg-gray-200 rounded"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>

                {menuOpen && (
                    <div className="border-t px-4 py-3 space-y-3 bg-white text-sm">
                        <button
                            onClick={() => {
                                onAboutClick();
                                setMenuOpen(false);
                            }}
                            className="block w-full text-left hover:text-gray-600 py-2"
                        >
                            about
                        </button>
                        <Link
                            href="/cv"
                            className="block hover:text-gray-600 py-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            experiences + skills
                        </Link>
                        <Link
                            href="https://www.instagram.com/charliennnicholson/"
                            className="block hover:text-gray-600 py-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            instagram
                        </Link>
                        <Link
                            href="mailto:charlienicholsonr@gmail.com"
                            className="block hover:text-gray-600 py-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            email
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
}
