'use client';

import Image from 'next/image';
import Link from 'next/link';

interface MobileAboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileAboutModal({ isOpen, onClose }: MobileAboutModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/30 text-shadow-none p-10 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-gray-50 border p-4 max-w-lg w-fit"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-lg font-walter">ABOUT</h1>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-200 rounded"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-3 text-sm">
                    <p>Hi, I'm Charlie. I am 15-year-old who likes to create through many different mediums.</p>
                    <p>Typically I do software, electrical, and mechanical engineering, but I also dabble in different areas of design (web, graphic, fashion), although I'm not very good at it :).</p>
                    <p>If I'm not creating something, you can probably find me listening to <Link className="underline" href="https://open.spotify.com/user/31ybjmvbe7siydivevnk37vditjq?si=a79d39522b4747f3">music</Link>, biking, or enjoying nature.</p>

                    <div className="border-t pt-3 mt-3">
                        <p className="font-walter text-xs mb-2 font-bold">FIND ME ONLINE</p>
                        <div className="space-y-2 text-xs">
                            <div>
                                <Link href="mailto:charlienicholsonr@gmail.com" className="underline">
                                    Email
                                </Link>
                            </div>
                            <div>
                                <Link href="https://github.com/crnicholson" className="underline">
                                    GitHub
                                </Link>
                            </div>
                            <div>
                                <Link href="https://www.linkedin.com/in/crnicholson/" className="underline">
                                    LinkedIn
                                </Link>
                            </div>
                            <div>
                                <Link href="https://www.instagram.com/charliennnicholson/" className="underline">
                                    Instagram
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-3 mt-3 text-xs">
                        <p className="font-walter font-bold mb-2">PS</p>
                        <p>I worked at <Link href="https://hackclub.com/" className="underline">Hack Club</Link> this summer. I am looking for internship opportunities this summer, 2026! Please reach out if you have any leads.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
