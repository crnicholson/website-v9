'use client'

import Image from "next/image"

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

interface TiledGalleryProps {
  images: GalleryImage[];
  columns?: number;
  gap?: number;
}

// Masonry layout: images are greedily placed into whichever column is
// currently shortest, so the result naturally varies (two stacked next to
// one tall image, three even columns, etc.) instead of forcing every image
// into uniform full-width rows. Each image keeps its own aspect ratio via
// CSS aspect-ratio, and columns split the parent's own width evenly, so the
// grid always fits its container with no overflow. Works for any project's
// image set without per-project tuning.
export default function TiledGallery({
  images,
  columns,
  gap = 6,
}: TiledGalleryProps) {
  if (!images || images.length === 0) return null;

  const columnCount = Math.max(
    1,
    Math.min(columns ?? Math.min(images.length, 2), images.length)
  );

  const columnImages: GalleryImage[][] = Array.from({ length: columnCount }, () => []);
  const columnHeights = new Array(columnCount).fill(0);

  for (const img of images) {
    const shortest = columnHeights.indexOf(Math.min(...columnHeights));
    columnImages[shortest].push(img);
    columnHeights[shortest] += img.height / img.width;
  }

  return (
    <div className="flex w-full" style={{ gap }}>
      {columnImages.map((col, i) => (
        <div key={i} className="flex flex-col flex-1 min-w-0" style={{ gap }}>
          {col.map((img, j) => (
            <div
              key={j}
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: `${img.width} / ${img.height}` }}
            >
              <Image
                src={img.src}
                alt={img.alt || ""}
                fill
                className="object-cover"
                sizes="260px"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
