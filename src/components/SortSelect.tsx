'use client';

import React from 'react';
import { SortAsc } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortSelect({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.set('page', '1'); // Reset to page 1 on sort
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
      <SortAsc size={18} className="text-slate-400 ml-2" />
      <select 
        name="sort" 
        defaultValue={defaultValue}
        className="bg-transparent text-sm font-black text-slate-700 outline-none pr-4 cursor-pointer appearance-none"
        onChange={handleSortChange}
      >
        <option value="rating">Top Rated</option>
        <option value="fee_low">Fees: Low to High</option>
        <option value="fee_high">Fees: High to Low</option>
        <option value="placement">Best Placement</option>
      </select>
    </div>
  );
}
