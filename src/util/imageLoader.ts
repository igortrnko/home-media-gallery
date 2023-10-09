"use client";

export default function myImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `/_next/image?url=http://localhost:3000/api/assets${src}&w=${width}&q=${
    quality || 75
  }`;
}
