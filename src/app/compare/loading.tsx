import React from 'react';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Skeleton className="h-6 w-32 rounded" />
            <Skeleton className="ml-8 h-8 w-48 rounded" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-64 rounded-xl" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-40 rounded-xl" />
              <Skeleton className="h-10 w-40 rounded-xl" />
            </div>
          </div>
          
          <div className="space-y-4">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="flex gap-4 border-b border-slate-50 pb-4">
                 <Skeleton className="h-8 w-1/4 rounded" />
                 <Skeleton className="h-8 w-1/4 rounded" />
                 <Skeleton className="h-8 w-1/4 rounded" />
                 <Skeleton className="h-8 w-1/4 rounded" />
               </div>
             ))}
          </div>
        </div>
      </main>
    </div>
  );
}
