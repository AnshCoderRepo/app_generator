'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useShortlist } from '@/components/ShortlistContext';

export default function CartNavbarItem() {
  const { shortlist } = useShortlist();
  const count = shortlist.length;

  return (
    <Link href="/compare" className="relative p-2 text-slate-600 hover:text-sky-600 transition-colors">
      <ShoppingCart size={24} />
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-sky-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
          {count}
        </span>
      )}
    </Link>
  );
}
