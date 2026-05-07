'use client';

import React from 'react';
import { useShortlist } from '@/components/ShortlistContext';
import { PlusCircle, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ShortlistButton({ collegeId }: { collegeId: string }) {
  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();
  const router = useRouter();
  const active = isInShortlist(collegeId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (active) {
      removeFromShortlist(collegeId);
    } else {
      addToShortlist(collegeId);
    }
  };

  const handleGoToCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/compare');
  };

  if (active) {
    return (
      <div className="mt-4 flex gap-2">
        <button 
          onClick={handleToggle}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <CheckCircle2 size={16} />
          In Cart
        </button>
        <button 
          onClick={handleGoToCompare}
          className="px-3 flex items-center justify-center text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors"
          title="Compare Now"
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleToggle}
      className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors"
    >
      <PlusCircle size={16} />
      Add to Cart
    </button>
  );
}
