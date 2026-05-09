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
      <div className="relative py-20 md:py-32 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-end">
            <Skeleton className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] opacity-20" />
            
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-6">
                <Skeleton className="h-7 w-24 rounded-full opacity-20" />
                <Skeleton className="h-7 w-32 rounded-full opacity-20" />
              </div>
              <Skeleton className="h-16 w-3/4 mx-auto lg:mx-0 mb-8 rounded-2xl opacity-20" />
              
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6">
                <Skeleton className="h-12 w-48 rounded-2xl opacity-20" />
                <Skeleton className="h-12 w-56 rounded-2xl opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-10 md:p-12 rounded-[3rem] shadow-sm border border-slate-200">
              <Skeleton className="h-10 w-64 mb-8 rounded-lg" />
              <Skeleton className="h-4 w-full mb-4 rounded" />
              <Skeleton className="h-4 w-full mb-4 rounded" />
              <Skeleton className="h-4 w-3/4 mb-12 rounded" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-3xl" />
                ))}
              </div>
            </section>

            <section className="bg-white p-10 md:p-12 rounded-[3rem] shadow-sm border border-slate-200">
              <Skeleton className="h-10 w-64 mb-10 rounded-lg" />
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 rounded-3xl" />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-200">
              <div className="mb-10 text-center flex flex-col items-center">
                <Skeleton className="h-14 w-14 rounded-2xl mb-4" />
                <Skeleton className="h-8 w-48 mb-2 rounded" />
                <Skeleton className="h-4 w-full rounded" />
              </div>
              
              <div className="space-y-4 mb-8">
                <Skeleton className="h-14 w-full rounded-2xl" />
                <Skeleton className="h-14 w-full rounded-2xl" />
                <Skeleton className="h-14 w-full rounded-2xl" />
              </div>
              
              <Skeleton className="h-16 w-full rounded-[1.5rem]" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
