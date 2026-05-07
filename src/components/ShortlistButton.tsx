'use client';

import React from 'react';
import { useShortlist } from '@/components/ShortlistContext';
import { PlusCircle, CheckCircle2, ShoppingCart, ArrowRight } from 'lucide-react';
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
      <div className="mt-6 flex gap-2 animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={handleToggle}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[10px] font-black uppercase tracking-[0.1em] text-green-600 bg-green-50 hover:bg-green-100 rounded-2xl transition-all border border-green-100 shadow-sm active:scale-95"
        >
          <CheckCircle2 size={16} />
          Selected
        </button>
        <button 
          onClick={handleGoToCompare}
          className="px-4 flex items-center justify-center text-white bg-slate-900 hover:bg-sky-600 rounded-2xl transition-all shadow-lg active:scale-95 group"
          title="Compare Now"
        >
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleToggle}
      className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-900 bg-slate-50 hover:bg-sky-600 hover:text-white rounded-2xl transition-all border border-slate-100 shadow-sm active:scale-[0.98]"
    >
      <PlusCircle size={16} />
      Add to Comparison
    </button>
  );
}
