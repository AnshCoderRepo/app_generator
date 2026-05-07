import React from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, GraduationCap, Filter, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getColleges, getFilterOptions } from '@/lib/data';
import ShortlistButton from '@/components/ShortlistButton';
import CartNavbarItem from '@/components/CartNavbarItem';
import CollegeImage from '@/components/CollegeImage';
import SortSelect from '@/components/SortSelect';

export const revalidate = 0;

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string, page?: string, location?: string, maxFee?: string, category?: string, sort?: string }> }) {
  const params = await searchParams;
  const q = params.q?.toLowerCase() || '';
  const page = parseInt(params.page || '1', 10);
  const locationFilter = params.location || '';
  const categoryFilter = params.category || '';
  const maxFee = parseInt(params.maxFee || '10000000', 10);
  const sortBy = params.sort || 'rating';
  
  const allColleges = await getColleges();
  const { states, categories } = await getFilterOptions();
  
  // Apply Search and Filters
  let filtered = allColleges.filter(c => {
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
    const matchLocation = !locationFilter || c.state === locationFilter || c.city === locationFilter;
    const matchCategory = !categoryFilter || c.type === categoryFilter;
    const matchFee = c.tuition <= maxFee;
    return matchSearch && matchLocation && matchCategory && matchFee;
  });

  // Apply Sorting
  filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'fee_low') return a.tuition - b.tuition;
    if (sortBy === 'fee_high') return b.tuition - a.tuition;
    if (sortBy === 'placement') return b.placement - a.placement;
    return 0;
  });

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedColleges = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-sky-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-sky-600/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-black text-2xl text-slate-900 tracking-tighter uppercase">College<span className="text-sky-600">Finder</span></span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-10">
              <nav className="flex items-center gap-8">
                <Link href="/" className="text-sm font-bold text-sky-600 border-b-2 border-sky-600 pb-1">Browse Colleges</Link>
                <Link href="/compare" className="text-sm font-bold text-slate-500 hover:text-sky-600 transition-colors">Comparison Tool</Link>
                <Link href="/predictor" className="text-sm font-bold text-slate-500 hover:text-sky-600 transition-colors">Admission Predictor</Link>
                <Link href="/qa" className="text-sm font-bold text-slate-500 hover:text-sky-600 transition-colors">Community Q&A</Link>
              </nav>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <div className="flex items-center gap-5">
                <CartNavbarItem />
                <Link href="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95">Log In</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Search */}
      <section className="relative bg-slate-900 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
           <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
            Discover the <span className="text-sky-400">Perfect Campus</span> <br/>for Your Career
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <form className="bg-white/10 backdrop-blur-xl p-2 rounded-[2rem] shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center flex-1 w-full px-6 py-4 md:py-0 border-b md:border-b-0 md:border-r border-white/10">
                <Search className="text-sky-400 mr-3" size={24} />
                <input 
                  type="text" 
                  name="q" 
                  defaultValue={q} 
                  placeholder="Search colleges, degrees, or courses..." 
                  className="w-full bg-transparent outline-none text-white placeholder:text-slate-400 font-medium" 
                />
              </div>
              <div className="flex items-center flex-[0.7] w-full px-6 py-4 md:py-0">
                <MapPin className="text-sky-400 mr-3" size={24} />
                <select 
                  name="location" 
                  defaultValue={locationFilter} 
                  className="w-full bg-transparent outline-none text-white font-medium appearance-none cursor-pointer"
                >
                  <option value="" className="text-slate-900">All Locations</option>
                  {states.map(state => (
                    <option key={state} value={state} className="text-slate-900">{state}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full md:w-auto bg-sky-500 hover:bg-sky-400 text-white px-10 py-4 rounded-[1.5rem] font-black transition-all shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2 hover:translate-x-1">
                Explore Now
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 sticky top-28">
              <div className="flex items-center gap-2 mb-8 text-slate-900">
                <Filter size={20} className="text-sky-600" />
                <h2 className="font-black uppercase tracking-wider text-sm">Advanced Filters</h2>
              </div>
              
              <form className="space-y-10" id="filter-form">
                <input type="hidden" name="q" value={q} />
                <input type="hidden" name="location" value={locationFilter} />
                <input type="hidden" name="sort" value={sortBy} />
                
                {/* Category Filter */}
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Institution Type</h3>
                  <div className="space-y-3">
                    <label className="flex items-center group cursor-pointer">
                      <input 
                        type="radio" 
                        name="category" 
                        value="" 
                        defaultChecked={!categoryFilter}
                        className="hidden" 
                      />
                      <span className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${!categoryFilter ? 'border-sky-500 bg-sky-500 shadow-lg shadow-sky-500/20' : 'border-slate-300 group-hover:border-sky-400'}`}>
                        {!categoryFilter && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </span>
                      <span className={`text-sm font-bold ${!categoryFilter ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>All Types</span>
                    </label>
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center group cursor-pointer">
                        <input 
                          type="radio" 
                          name="category" 
                          value={cat} 
                          defaultChecked={categoryFilter === cat}
                          className="hidden" 
                        />
                        <span className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${categoryFilter === cat ? 'border-sky-500 bg-sky-500 shadow-lg shadow-sky-500/20' : 'border-slate-300 group-hover:border-sky-400'}`}>
                          {categoryFilter === cat && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </span>
                        <span className={`text-sm font-bold ${categoryFilter === cat ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fee Range Filter */}
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Max Annual Fee</h3>
                  <select 
                    name="maxFee" 
                    defaultValue={params.maxFee}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-sky-500 transition-colors cursor-pointer appearance-none"
                  >
                    <option value="10000000">No Limit</option>
                    <option value="50000">Under ₹50,000</option>
                    <option value="100000">Under ₹1,00,000</option>
                    <option value="250000">Under ₹2,50,000</option>
                    <option value="500000">Under ₹5,00,000</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl hover:shadow-sky-600/20 active:scale-95">
                  Apply Filters
                </button>
                
                {(q || locationFilter || categoryFilter || params.maxFee) && (
                  <Link href="/" className="block text-center text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">
                    Clear All Filters
                  </Link>
                )}
              </form>
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">Search Results</p>
                <h2 className="text-3xl font-black text-slate-900">
                  {filtered.length} <span className="text-sky-600">Institutions</span> Found
                </h2>
              </div>
              
              <SortSelect defaultValue={sortBy} />
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-[3rem] p-20 text-center border border-dashed border-slate-200">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-slate-300" size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No Matches Found</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">We couldn't find any colleges matching your current filters. Try broadening your search.</p>
                <Link href="/" className="inline-block mt-8 bg-sky-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-sky-600/20">
                  Reset Everything
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {paginatedColleges.map((college: any) => (
                    <div key={college.id} className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col">
                      <div className="h-56 relative overflow-hidden">
                        <CollegeImage 
                          src={college.imageUrl} 
                          alt={college.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute top-5 left-5 z-20">
                          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                            {college.type}
                          </span>
                        </div>
                        <div className="absolute bottom-5 left-5 right-5 z-20 flex justify-between items-center">
                           <div className="flex items-center gap-1.5 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-xs font-black shadow-lg">
                             <Star size={14} className="fill-slate-900" />
                             {college.rating.toFixed(1)}
                           </div>
                           <div className="flex items-center gap-1.5 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                             {college.placement}% Placement
                           </div>
                        </div>
                      </div>
                      
                      <div className="p-8 flex flex-col flex-1">
                        <Link href={`/college/${college.id}`} className="text-xl font-black text-slate-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2 leading-tight">
                          {college.name}
                        </Link>
                        
                        <div className="flex items-start gap-2 text-slate-400 text-sm mb-6">
                          <MapPin size={16} className="shrink-0 mt-0.5 text-sky-500" />
                          <span className="font-bold line-clamp-1">{college.location}</span>
                        </div>
                        
                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Starting Fee</span>
                            <span className="text-xl font-black text-slate-900">₹{college.tuition.toLocaleString()}</span>
                          </div>
                          <ShortlistButton collegeId={college.id} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                      Showing Page <span className="text-slate-900">{page}</span> of <span className="text-slate-900">{totalPages}</span>
                    </p>
                    
                    <div className="flex items-center gap-2">
                      {page > 1 && (
                        <Link 
                          href={`/?q=${q}&location=${locationFilter}&maxFee=${params.maxFee || ''}&category=${categoryFilter}&sort=${sortBy}&page=${page - 1}`}
                          className="w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                        >
                          <ChevronLeft size={24} />
                        </Link>
                      )}
                      
                      {/* Numeric Pages (Condensed) */}
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNum = page;
                        if (page <= 3) pageNum = i + 1;
                        else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                        else pageNum = page - 2 + i;
                        
                        if (pageNum <= 0 || pageNum > totalPages) return null;

                        return (
                          <Link 
                            key={pageNum}
                            href={`/?q=${q}&location=${locationFilter}&maxFee=${params.maxFee || ''}&category=${categoryFilter}&sort=${sortBy}&page=${pageNum}`}
                            className={`w-12 h-12 flex items-center justify-center rounded-2xl text-sm font-black transition-all shadow-sm border ${page === pageNum ? 'bg-sky-600 border-sky-600 text-white shadow-sky-600/30 scale-110' : 'bg-white border-slate-200 text-slate-600 hover:border-sky-400 hover:text-sky-600'}`}
                          >
                            {pageNum}
                          </Link>
                        );
                      })}

                      {page < totalPages && (
                        <Link 
                          href={`/?q=${q}&location=${locationFilter}&maxFee=${params.maxFee || ''}&category=${categoryFilter}&sort=${sortBy}&page=${page + 1}`}
                          className="w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                        >
                          <ChevronRight size={24} />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
             <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-3 mb-6">
                <div className="bg-sky-600 p-2 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase">College<span className="text-sky-600">Finder</span></span>
              </div>
              <p className="text-slate-400 max-w-md font-medium leading-relaxed">
                Empowering students with comprehensive data and AI-driven insights to find their ideal educational path. Explore over 90,000 institutions across India.
              </p>
             </div>
             <div>
               <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-6 text-sky-400">Quick Links</h4>
               <ul className="space-y-4 text-slate-400 font-bold text-sm">
                 <li><Link href="/" className="hover:text-white transition-colors">Find Colleges</Link></li>
                 <li><Link href="/compare" className="hover:text-white transition-colors">Compare Tool</Link></li>
                 <li><Link href="/predictor" className="hover:text-white transition-colors">Predictor</Link></li>
               </ul>
             </div>
             <div>
               <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-6 text-sky-400">Company</h4>
               <ul className="space-y-4 text-slate-400 font-bold text-sm">
                 <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Contact Support</Link></li>
               </ul>
             </div>
           </div>
           <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-xs font-bold tracking-widest uppercase">
             © 2026 CollegeFinder. All rights reserved. Built with precision for students.
           </div>
        </div>
      </footer>
    </div>
  );
}
