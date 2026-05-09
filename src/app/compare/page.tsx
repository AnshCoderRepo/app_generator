import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getColleges, getCollegeById } from '@/lib/data';
import CompareTable from '@/components/CompareTable';

export const revalidate = 0;

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ c1?: string, c2?: string, c3?: string, ids?: string }> }) {
  const params = await searchParams;
  const allColleges = await getColleges();
  
  let initialColleges: any[] = [];
  
  if (params.ids) {
    const ids = params.ids.split(',');
    initialColleges = await Promise.all(ids.map(id => getCollegeById(id)));
  } else {
    const c1 = params.c1 ? await getCollegeById(params.c1) : null;
    const c2 = params.c2 ? await getCollegeById(params.c2) : null;
    const c3 = params.c3 ? await getCollegeById(params.c3) : null;
    initialColleges = [c1, c2, c3];
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
           <Link href="/" className="inline-flex items-center text-slate-500 hover:text-sky-600 transition-colors font-bold text-sm uppercase tracking-widest mb-4 group">
             <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Search
           </Link>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Compare <span className="text-sky-600">Colleges</span></h1>
           <p className="text-slate-500 font-medium">Select up to 6 institutions to see a detailed side-by-side analysis.</p>
        </div>
        <CompareTable allColleges={allColleges} initialColleges={initialColleges} />
      </main>
    </div>
  );
}

