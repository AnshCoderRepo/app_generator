import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Award } from 'lucide-react';
import { getColleges } from '@/lib/data';
import CollegeImage from '@/components/CollegeImage';

export const revalidate = 0;

export default async function PredictorPage({ searchParams }: { searchParams: Promise<{ exam?: string, rank?: string }> }) {
  const params = await searchParams;
  const rank = parseInt(params.rank || '0', 10);
  
  const allColleges = await getColleges();
  let predictedColleges: any[] = [];
  let hasSearched = false;

  if (rank > 0) {
    hasSearched = true;
    // Simple logic:
    // Rank < 5000: Colleges with Rating >= 4.8
    // Rank < 20000: Colleges with Rating >= 4.5
    // Rank >= 20000: Other colleges
    predictedColleges = allColleges.filter(c => {
      if (rank <= 5000) return c.rating >= 4.8;
      if (rank <= 20000) return c.rating >= 4.5 && c.rating < 4.8;
      return c.rating < 4.5;
    }).slice(0, 12); // Show top 12 matches
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center text-slate-500 hover:text-sky-600 transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back to Search
            </Link>
            <h1 className="ml-8 font-bold text-xl text-slate-900">College Predictor</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Predict Your Admission</h2>
            <p className="text-slate-500 mb-8">Enter your competitive exam details to see where you have the highest chances of admission based on past dataset trends.</p>
            
            <form className="flex flex-col md:flex-row gap-4" method="GET" action="/predictor">
              <select name="exam" defaultValue={params.exam || 'jee'} className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-sky-500 flex-1 bg-slate-50">
                <option value="jee">JEE Main</option>
                <option value="neet">NEET</option>
                <option value="cat">CAT</option>
                <option value="gate">GATE</option>
              </select>
              <input type="number" name="rank" defaultValue={params.rank || ''} placeholder="Enter your All India Rank" required className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-sky-500 flex-1 bg-slate-50" />
              <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3 rounded-xl transition-colors">
                Predict
              </button>
            </form>
          </div>
        </div>

        {hasSearched && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Award className="mr-2 text-amber-500" /> You have high chances at these {predictedColleges.length} colleges:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {predictedColleges.map((college: any) => (
                <Link href={`/college/${college.id}`} key={college.id} className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-sky-100 transition-all overflow-hidden">
                  <div className="h-32 relative overflow-hidden">
                    <CollegeImage 
                      src={college.imageUrl} 
                      alt={college.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-green-500 px-2 py-1 rounded shadow-lg">Safe Zone</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col h-full relative z-20 bg-white">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-1">{college.name}</h3>
                    <p className="text-slate-500 text-xs mb-4 flex items-center">
                      <span className="mr-1">📍</span> {college.location}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{college.type}</span>
                      <span className="text-sm font-bold text-sky-600">₹{college.tuition.toLocaleString()}/yr</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {predictedColleges.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-slate-500">No matching colleges found for this rank range in the current dataset.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
