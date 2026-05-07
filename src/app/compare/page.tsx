import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getColleges, getCollegeById } from '@/lib/data';
import CompareTable from '@/components/CompareTable';

export const revalidate = 0;

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ c1?: string, c2?: string, c3?: string }> }) {
  const params = await searchParams;
  const allColleges = await getColleges();
  
  const c1 = params.c1 ? await getCollegeById(params.c1) : null;
  const c2 = params.c2 ? await getCollegeById(params.c2) : null;
  const c3 = params.c3 ? await getCollegeById(params.c3) : null;

  const initialColleges = [c1, c2, c3];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center text-slate-500 hover:text-sky-600 transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back to Search
            </Link>
            <h1 className="ml-8 font-bold text-xl text-slate-900">Compare Colleges</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CompareTable allColleges={allColleges} initialColleges={initialColleges} />
      </main>
    </div>
  );
}
