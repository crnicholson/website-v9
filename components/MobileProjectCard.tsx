'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface MobileProjectCardProps {
    id: number | string;
    image?: string;
    name?: string;
    about?: string;
    link?: string;
}

export default function MobileProjectCard({
    id,
    image,
    name,
    about,
    link,
}: MobileProjectCardProps) {
    const [expanded, setExpanded] = useState(false);

    if (image && name) {
        return (
            <div className="bg-white border rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
                {image && (
                    <div className="relative h-48 w-full bg-gray-100">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="p-4">
                    <h3 className="font-walter text-sm mb-2 font-bold line-clamp-2">
                        {name}
                    </h3>
                    {about && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                            {about}
                        </p>
                    )}
                    {link && (
                        <Link
                            href={link}
                            className="text-xs underline hover:text-gray-600 inline-block"
                        >
                            explore →
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    return null;
}
