import React from 'react';
import Link from 'next/link';
import { MapPin, Star, GraduationCap, ArrowLeft, BookOpen, MessageSquare, Briefcase, CheckCircle2 } from 'lucide-react';
import { getCollegeById } from '@/lib/data';
import { notFound } from 'next/navigation';
import CollegeImage from '@/components/CollegeImage';

export const revalidate = 0;

export default async function CollegePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = await getCollegeById(id);

  if (!college) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center text-slate-500 hover:text-sky-600 transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back to Search
            </Link>
          </div>
        </div>
      </header>

      {/* College Hero Profile */}
      {/* College Hero Profile */}
      <div className="relative text-white py-12 md:py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <CollegeImage 
            src={college.imageUrl} 
            alt={college.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl p-1 flex-shrink-0 shadow-2xl overflow-hidden">
              <div className="w-full h-full bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                <GraduationCap className="w-16 h-16 md:w-20 md:h-20 text-sky-600" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                <span className="bg-sky-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-sky-500/20">
                  {college.type}
                </span>
                <div className="flex items-center text-amber-400 font-bold bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-sm">
                  <Star size={16} className="fill-amber-400 mr-2" />
                  {college.rating.toFixed(1)} <span className="text-white/60 ml-1 font-medium">Rating</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-sm">{college.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-slate-200">
                <div className="flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <MapPin size={20} className="mr-2 text-sky-400" />
                  <span className="font-medium">{college.location}</span>
                </div>
                <div className="flex items-center bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <Briefcase size={20} className="mr-2 text-green-400" />
                  <span className="text-green-400 font-bold">{college.placement}% Placement Rate</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-col gap-4 mt-6 md:mt-0">
               <button className="w-full md:w-56 bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl shadow-sky-600/30">
                 Apply Now
               </button>
               <Link href={`/compare?c1=${college.id}`} className="w-full md:w-56 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-4 px-8 rounded-2xl transition-all text-center text-sm backdrop-blur-sm">
                 Compare College
               </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview / Basic Info */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {college.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="block text-xl font-bold text-slate-900">₹{college.tuition.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">1st Yr Fees</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="block text-xl font-bold text-slate-900">{college.courses.length}</span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Courses</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="block text-xl font-bold text-slate-900">{college.city || 'N/A'}</span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">City</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="block text-xl font-bold text-slate-900">{college.state || 'N/A'}</span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">State</span>
                </div>
              </div>
            </section>

            {/* Courses Section */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center mb-6">
                <BookOpen className="text-sky-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-slate-900">Courses & Fees</h2>
              </div>
              
              <div className="space-y-4">
                {college.courses.map((course: any) => (
                  <div key={course.id} className="border border-slate-100 p-5 rounded-xl hover:border-sky-200 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{course.title}</h3>
                      <p className="text-slate-500 text-sm mt-1">{course.degree} • {course.durationYears} Years</p>
                    </div>
                    <div className="text-left md:text-right bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 w-full md:w-auto">
                      <span className="block font-bold text-slate-900 text-lg">₹{course.fees.toLocaleString()}</span>
                      <span className="text-xs text-slate-500 uppercase font-semibold">Total Fees</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Placements Section */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center mb-6">
                <Briefcase className="text-sky-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-slate-900">Placement Highlights</h2>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="text-green-600" size={24} />
                  <h3 className="text-lg font-bold text-slate-900">Strong Placement Record</h3>
                </div>
                <p className="text-slate-700 mb-6">Based on recent data, this institution has a solid placement record across all major courses.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="block text-2xl font-black text-green-600">{college.placement}%</span>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Placement Rate</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="block text-xl font-black text-slate-900">₹{(college.tuition * 0.8).toLocaleString()}</span>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Avg. Package</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="block text-xl font-black text-slate-900">₹{(college.tuition * 3.5).toLocaleString()}</span>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Highest Package</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center mb-6">
                <MessageSquare className="text-sky-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-slate-900">Student Reviews</h2>
              </div>
              
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center font-bold text-white mr-3">
                        {i === 1 ? 'A' : 'R'}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{i === 1 ? 'Anjali S.' : 'Rohan M.'}</p>
                        <div className="flex items-center text-amber-500 text-xs mt-0.5">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} size={12} className={idx < Math.floor(college.rating) ? "fill-amber-500" : "text-slate-300"} />
                          ))}
                          <span className="text-slate-500 ml-1 font-medium">{college.rating.toFixed(1)} / 5</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      "Great campus and faculty. The courses are highly relevant to the industry. The placement cell is very active and brings in top recruiters."
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
               <div className="mb-6 pb-6 border-b border-slate-100">
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Interested?</h3>
                 <p className="text-xl font-bold text-slate-900 mb-1">Get Admission Info</p>
                 <p className="text-sm text-slate-500">Free counselling from our experts.</p>
               </div>
               
              <form className="space-y-3 mb-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-sky-500" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-sky-500" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-sky-500" />
              </form>
              
              <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl transition-colors mb-3 shadow-md shadow-sky-600/20">
                Request Callback
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
