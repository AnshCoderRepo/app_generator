import React from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, GraduationCap, SlidersHorizontal, BookOpen } from 'lucide-react';
import { getColleges } from '@/lib/data';
import ShortlistButton from '../components/ShortlistButton';
import CartNavbarItem from '../components/CartNavbarItem';
import CollegeImage from '../components/CollegeImage';

export const revalidate = 0;

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string, page?: string, location?: string, maxFee?: string }> }) {
  const params = await searchParams;
  const q = params.q?.toLowerCase() || '';
  const page = parseInt(params.page || '1', 10);
  const locationFilter = params.location?.toLowerCase() || '';
  const maxFee = parseInt(params.maxFee || '10000000', 10);
  
  const allColleges = await getColleges();
  
  // Apply Search and Filters
  const filtered = allColleges.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
    const matchLocation = locationFilter ? c.location.toLowerCase().includes(locationFilter) : true;
    const matchFee = c.tuition <= maxFee;
    return matchSearch && matchLocation && matchFee;
  });

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedColleges = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-sky-600" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">CollegeFinder</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-slate-900">Colleges</Link>
              <Link href="/compare" className="text-sm font-medium text-slate-600 hover:text-sky-600">Compare</Link>
              <Link href="/predictor" className="text-sm font-medium text-slate-600 hover:text-sky-600">Predictor Tool</Link>
              <Link href="/qa" className="text-sm font-medium text-slate-600 hover:text-sky-600">Q&A</Link>
            </nav>
            <div className="flex items-center gap-4">
              <CartNavbarItem />
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-sky-600">Log In</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="bg-sky-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Find the Best College for Your Future
          </h1>
          <form className="bg-white p-2 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto">
            <div className="flex items-center flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-slate-200 py-2 md:py-0">
              <Search className="text-slate-400 mr-2" size={20} />
              <input type="text" name="q" defaultValue={q} placeholder="Search colleges, exams..." className="w-full py-2 outline-none text-slate-700 bg-transparent" />
            </div>
            <div className="flex items-center flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-slate-200 py-2 md:py-0">
              <MapPin className="text-slate-400 mr-2" size={20} />
              <input type="text" name="location" defaultValue={params.location} placeholder="Location (e.g. Tamil Nadu)" className="w-full py-2 outline-none text-slate-700 bg-transparent" />
            </div>
            <div className="flex items-center flex-1 w-full px-4 py-2 md:py-0">
              <SlidersHorizontal className="text-slate-400 mr-2" size={20} />
              <select name="maxFee" defaultValue={params.maxFee} className="w-full py-2 outline-none text-slate-700 bg-transparent cursor-pointer">
                <option value="">Any Fee</option>
                <option value="50000">Under ₹50,000</option>
                <option value="100000">Under ₹1,00,000</option>
                <option value="500000">Under ₹5,00,000</option>
              </select>
            </div>
            <button type="submit" className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-semibold transition-colors mt-2 md:mt-0">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Main Content - College Listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {q || locationFilter ? 'Search Results' : 'Top Rated Colleges'} 
              <span className="text-sky-600 ml-2">({filtered.length})</span>
            </h2>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-700 mb-2">No colleges found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedColleges.map((college: any) => (
              <div key={college.id} className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all overflow-hidden">
                <div className="h-48 bg-slate-200 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <CollegeImage 
                    src={college.imageUrl} 
                    alt={college.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10"></div>
                  <div className="absolute bottom-3 left-3 z-20 flex gap-2">
                    <span className="bg-sky-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase shadow-lg">
                      {college.type}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <Link href={`/college/${college.id}`} className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2 leading-tight">
                    {college.name}
                  </Link>
                  <div className="flex items-center text-slate-500 text-xs mb-4">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{college.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">1st Year Fees</span>
                      <span className="font-bold text-slate-900 text-sm">₹{college.tuition.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Rating</span>
                      <div className="flex items-center text-amber-500 font-bold text-sm">
                        <Star size={14} className="fill-amber-500 mr-1" />
                        {college.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  <ShortlistButton collegeId={college.id} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {page > 1 && (
              <Link href={`/?q=${q}&location=${locationFilter}&maxFee=${params.maxFee || ''}&page=${page - 1}`} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium">
                Previous
              </Link>
            )}
            <span className="text-slate-500 font-medium px-4">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link href={`/?q=${q}&location=${locationFilter}&maxFee=${params.maxFee || ''}&page=${page + 1}`} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium">
                Next
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
