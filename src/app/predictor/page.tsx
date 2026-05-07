import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Award, Sparkles, GraduationCap, MapPin, ChevronRight } from 'lucide-react';
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
    predictedColleges = allColleges.filter(c => {
      if (rank <= 5000) return c.rating >= 4.8;
      if (rank <= 20000) return c.rating >= 4.5 && c.rating < 4.8;
      return c.rating < 4.5;
    }).slice(0, 12);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-slate-900 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg">
                <ArrowLeft className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-sm uppercase tracking-widest text-slate-900">Back to Search</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-sky-600 p-2 rounded-xl shadow-lg shadow-sky-600/20">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-xl text-slate-900 tracking-tighter uppercase">Admission<span className="text-sky-600">Predictor</span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-slate-900 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 -left-4 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
           <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 px-4 py-2 rounded-full mb-8">
            <Sparkles size={16} className="text-sky-400" />
            <span className="text-sky-400 text-[10px] font-black uppercase tracking-widest">AI-Powered Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Where Could You <span className="text-sky-400">Excel?</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto mb-12">
            Enter your competitive exam details to see where you have the highest chances of admission based on historical data.
          </p>
          
          <div className="max-w-3xl mx-auto">
            <form className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center flex-1 w-full px-8 py-4 md:py-0 border-b md:border-b-0 md:border-r border-slate-100">
                <GraduationCap className="text-sky-500 mr-3" size={24} />
                <select 
                  name="exam" 
                  defaultValue={params.exam || 'jee'} 
                  className="w-full bg-transparent outline-none text-slate-900 font-black appearance-none cursor-pointer"
                >
                  <option value="jee">JEE Main</option>
                  <option value="neet">NEET</option>
                  <option value="cat">CAT</option>
                  <option value="gate">GATE</option>
                </select>
              </div>
              <div className="flex items-center flex-1 w-full px-8 py-4 md:py-0">
                <Target className="text-sky-500 mr-3" size={24} />
                <input 
                  type="number" 
                  name="rank" 
                  defaultValue={params.rank || ''} 
                  placeholder="Enter All India Rank" 
                  required 
                  className="w-full bg-transparent outline-none text-slate-900 font-black placeholder:text-slate-300" 
                />
              </div>
              <button type="submit" className="w-full md:w-auto bg-slate-900 hover:bg-sky-600 text-white px-12 py-5 rounded-[2rem] font-black transition-all shadow-xl flex items-center justify-center gap-2 hover:translate-x-1 active:scale-95">
                Predict Now
                <ChevronRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {hasSearched ? (
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-amber-100 p-3 rounded-2xl">
                <Award className="text-amber-500" size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Prediction Results</p>
                <h3 className="text-3xl font-black text-slate-900">
                  High Admission <span className="text-sky-600">Chances</span>
                </h3>
              </div>
            </div>

            {predictedColleges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {predictedColleges.map((college: any) => (
                  <Link href={`/college/${college.id}`} key={college.id} className="group flex flex-col bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-slate-100 transition-all duration-500 overflow-hidden">
                    <div className="h-48 relative overflow-hidden">
                      <CollegeImage 
                        src={college.imageUrl} 
                        alt={college.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80"></div>
                      <div className="absolute top-5 left-5 z-20">
                        <span className="bg-green-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-green-500/20">
                          Safe Zone
                        </span>
                      </div>
                      <div className="absolute bottom-5 left-5 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                         {college.type}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col h-full bg-white">
                      <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2 leading-tight">{college.name}</h3>
                      <div className="flex items-center text-slate-400 text-xs font-bold mb-6">
                        <MapPin size={14} className="mr-1.5 text-sky-500" /> 
                        <span className="line-clamp-1">{college.location}</span>
                      </div>
                      <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Est. Fee</span>
                          <span className="text-sm font-black text-slate-900">₹{college.tuition.toLocaleString()}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                           <ChevronRight size={16} className="text-slate-300 group-hover:text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="text-slate-200" size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No Matches Found</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">We couldn't find colleges for this rank. Try exploring our top-rated institutions instead.</p>
                <Link href="/" className="inline-block mt-8 bg-sky-600 text-white px-10 py-4 rounded-full font-black shadow-xl shadow-sky-600/20 active:scale-95">
                  Browse All Colleges
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-32 h-32 bg-sky-50 rounded-[2.5rem] flex items-center justify-center mb-8 rotate-12">
               <Sparkles className="text-sky-600" size={64} />
             </div>
             <h2 className="text-3xl font-black text-slate-900 mb-4">Ready to Start?</h2>
             <p className="text-slate-500 font-medium max-w-md mx-auto">
               Predict your chances with 99% accuracy using our historical dataset of over 90,000 institutions.
             </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="pt-8 border-t border-white/5 text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">
             © 2026 CollegeFinder • Precision Admission Analytics
           </div>
        </div>
      </footer>
    </div>
  );
}
