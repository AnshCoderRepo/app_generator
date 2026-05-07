'use client';

import React, { useState } from 'react';

interface CollegeImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CollegeImage({ src, alt, className }: CollegeImageProps) {
  const [error, setError] = useState(false);
  
  // A reliable fallback image
  const fallbackSrc = 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2066&auto=format&fit=crop';

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
