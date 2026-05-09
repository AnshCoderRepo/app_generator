import React from 'react';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar Skeleton */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-8 w-40 rounded-lg" />
            </div>
            <div className="hidden lg:flex items-center gap-10">
              <div className="flex items-center gap-8">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <div className="flex items-center gap-5">
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Skeleton */}
      <section className="relative bg-slate-900 py-20 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Skeleton className="h-16 w-3/4 mx-auto mb-8 rounded-2xl opacity-20" />
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl p-2 rounded-[2rem] border border-white/10 flex flex-col md:flex-row items-center gap-2">
               <div className="flex-1 w-full p-4 border-b md:border-b-0 md:border-r border-white/10">
                 <Skeleton className="h-6 w-full rounded opacity-20" />
               </div>
               <div className="flex-[0.7] w-full p-4">
                 <Skeleton className="h-6 w-full rounded opacity-20" />
               </div>
               <Skeleton className="h-14 w-full md:w-40 rounded-[1.5rem] opacity-40" />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Skeleton */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
              <Skeleton className="h-6 w-3/4 mb-8 rounded" />
              <div className="space-y-10">
                <div>
                  <Skeleton className="h-3 w-1/2 mb-4 rounded" />
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                    <Skeleton className="h-5 w-full rounded" />
                  </div>
                </div>
                <Skeleton className="h-14 w-full rounded-2xl" />
              </div>
            </div>
          </aside>

          {/* Results Area Skeleton */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
              <div className="w-full md:w-auto">
                <Skeleton className="h-3 w-20 mb-2 rounded" />
                <Skeleton className="h-10 w-64 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-48 rounded-xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                  <Skeleton className="h-56 w-full" />
                  <div className="p-8 flex flex-col flex-1">
                    <Skeleton className="h-7 w-3/4 mb-3 rounded" />
                    <Skeleton className="h-4 w-1/2 mb-6 rounded" />
                    <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                      <div className="space-y-2">
                        <Skeleton className="h-2 w-16 rounded" />
                        <Skeleton className="h-6 w-24 rounded" />
                      </div>
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
