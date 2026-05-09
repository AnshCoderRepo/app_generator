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
      <section className="relative bg-slate-900 py-20 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Skeleton className="h-12 w-3/4 mx-auto mb-6 rounded-2xl opacity-20" />
          <Skeleton className="h-4 w-1/2 mx-auto mb-10 rounded opacity-20" />
          <Skeleton className="h-16 w-full max-w-2xl mx-auto rounded-2xl opacity-10" />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Feed Skeleton */}
          <div className="flex-1 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
               <Skeleton className="h-8 w-48 mb-6 rounded" />
               <Skeleton className="h-40 w-full rounded-[1.5rem] mb-4" />
               <div className="flex justify-between items-center">
                 <div className="flex gap-2">
                   <Skeleton className="h-6 w-20 rounded-full" />
                   <Skeleton className="h-6 w-20 rounded-full" />
                 </div>
                 <Skeleton className="h-12 w-40 rounded-2xl" />
               </div>
            </div>

            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-14 h-14 rounded-2xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24 rounded" />
                        <Skeleton className="h-3 w-16 rounded-full" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-12 rounded" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2 rounded" />
                  <Skeleton className="h-4 w-3/4 mb-8 rounded" />
                  
                  <div className="ml-4 pl-8 border-l-2 border-slate-100 space-y-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-xl" />
                      <Skeleton className="h-3 w-20 rounded" />
                    </div>
                    <Skeleton className="h-3 w-full rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <aside className="w-full lg:w-80 shrink-0 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <Skeleton className="h-6 w-32 mb-6 rounded" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-xl" />
                ))}
              </div>
            </div>
            <Skeleton className="h-64 w-full rounded-[2.5rem]" />
          </aside>
        </div>
      </main>
    </div>
  );
}
