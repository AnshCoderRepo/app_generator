import React from 'react';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header Skeleton */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-8 w-40 rounded" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Skeleton */}
      <section className="relative bg-slate-900 py-24 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Skeleton className="h-10 w-48 mx-auto mb-8 rounded-full opacity-20" />
          <Skeleton className="h-16 w-3/4 mx-auto mb-6 rounded-2xl opacity-20" />
          <Skeleton className="h-4 w-1/2 mx-auto mb-12 rounded opacity-20" />
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-2 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full p-6 border-b md:border-b-0 md:border-r border-slate-100">
                <Skeleton className="h-6 w-full rounded" />
              </div>
              <div className="flex-1 w-full p-6">
                <Skeleton className="h-6 w-full rounded" />
              </div>
              <Skeleton className="h-16 w-full md:w-40 rounded-[2rem]" />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Skeleton className="w-32 h-32 rounded-[2.5rem] mb-8" />
          <Skeleton className="h-10 w-64 mb-4 rounded" />
          <Skeleton className="h-4 w-80 rounded" />
        </div>
      </main>
    </div>
  );
}
