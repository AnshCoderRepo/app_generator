'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { useShortlist } from '@/components/ShortlistContext';

export default function CartNavbarItem() {
  const { shortlist } = useShortlist();
  const count = shortlist.length;

  return (
    <Link href="/compare" className="relative group p-3 bg-slate-50 hover:bg-sky-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-sky-600/20 active:scale-95">
      <LayoutGrid size={20} className="text-slate-600 group-hover:text-white transition-colors" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-slate-900 group-hover:bg-white group-hover:text-sky-600 text-white text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white transition-all shadow-lg">
          {count}
        </span>
      )}
    </Link>
  );
}
