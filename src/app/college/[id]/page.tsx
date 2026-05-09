import React from 'react';
import Link from 'next/link';
import { MapPin, Star, GraduationCap, ArrowLeft, BookOpen, MessageSquare, Briefcase, CheckCircle2, ChevronRight, Phone, Mail, Globe, Users, Sparkles, TrendingUp } from 'lucide-react';
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
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-xl text-slate-900 tracking-tighter uppercase">College<span className="text-sky-600">Profile</span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Cinematic Hero */}
      <div className="relative text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CollegeImage 
            src={college.imageUrl} 
            alt={college.name} 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-slate-950/40 to-slate-950/20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-end">
            <div className="w-40 h-40 md:w-56 md:h-56 bg-white rounded-[3rem] p-1.5 flex-shrink-0 shadow-2xl overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full bg-slate-50 rounded-[2.5rem] flex items-center justify-center border border-slate-100">
                <GraduationCap className="w-20 h-20 md:w-28 md:h-28 text-sky-600" />
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-6">
                <span className="bg-sky-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl shadow-sky-500/20">
                  {college.type}
                </span>
                <div className="flex items-center text-amber-400 font-black bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-1.5 rounded-full text-sm">
                  <Star size={18} className="fill-amber-400 mr-2" />
                  {college.rating.toFixed(1)} <span className="text-white/60 ml-2 font-bold uppercase tracking-widest text-[10px]">Rating</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tighter drop-shadow-2xl">{college.name}</h1>
              
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6">
                <div className="flex items-center bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl">
                  <MapPin size={20} className="mr-3 text-sky-400" />
                  <span className="font-bold text-lg">{college.location}</span>
                </div>
                <div className="flex items-center bg-green-500/20 border border-green-500/30 px-6 py-3 rounded-2xl backdrop-blur-xl">
                  <Briefcase size={20} className="mr-3 text-green-400" />
                  <span className="text-green-400 font-black uppercase tracking-widest text-sm">{college.placement}% Placement Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section className="bg-white p-10 md:p-12 rounded-[3rem] shadow-sm border border-slate-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <BookOpen size={120} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Institutional Overview</h2>
              <p className="text-slate-600 leading-relaxed text-xl font-medium mb-12">
                {college.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center hover:bg-sky-50 hover:border-sky-100 transition-colors">
                  <span className="block text-2xl font-black text-slate-900 mb-1">₹{college.tuition.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Starting Fee</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center hover:bg-sky-50 hover:border-sky-100 transition-colors">
                  <span className="block text-2xl font-black text-slate-900 mb-1">{college.courses.length}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Available Courses</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center hover:bg-sky-50 hover:border-sky-100 transition-colors">
                  <span className="block text-2xl font-black text-slate-900 mb-1">{college.city || 'N/A'}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Campus City</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center hover:bg-sky-50 hover:border-sky-100 transition-colors">
                  <span className="block text-2xl font-black text-slate-900 mb-1">{college.state || 'N/A'}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Region</span>
                </div>
              </div>
            </section>

            {/* Courses & Fees */}
            <section className="bg-white p-10 md:p-12 rounded-[3rem] shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-sky-50 p-3 rounded-2xl">
                  <GraduationCap className="text-sky-600" size={28} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Academic Programs</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {college.courses.map((course: any) => (
                  <div key={course.id} className="group/item border border-slate-100 p-8 rounded-3xl hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/5 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover/item:bg-sky-600 group-hover/item:text-white transition-all">
                         {course.degree[0]}
                       </div>
                       <div>
                        <h3 className="font-black text-xl text-slate-900 group-hover/item:text-sky-600 transition-colors">{course.title}</h3>
                        <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-widest">{course.degree} Program • {course.durationYears} Years Full-Time</p>
                      </div>
                    </div>
                    <div className="text-left md:text-right bg-slate-900 px-8 py-4 rounded-2xl border border-slate-800 w-full md:w-auto shadow-xl group-hover/item:bg-sky-600 transition-colors">
                      <span className="block font-black text-white text-xl">₹{course.fees.toLocaleString()}</span>
                      <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Annual Tuition</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Placement Analytics */}
            <section className="bg-slate-900 p-10 md:p-12 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                 <Briefcase size={150} />
               </div>
               <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-sky-500 p-3 rounded-2xl">
                    <TrendingUp className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight">Placement Analytics</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 size={20} className="text-green-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Success Rate</span>
                      </div>
                      <p className="text-5xl font-black text-white mb-2">{college.placement}%</p>
                      <p className="text-sm text-slate-500 font-medium">Students placed within 6 months of graduation.</p>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Users size={20} className="text-sky-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Average Salary</span>
                      </div>
                      <p className="text-5xl font-black text-white mb-2">₹{(college.tuition * 0.8 / 1000).toFixed(0)}K</p>
                      <p className="text-sm text-slate-500 font-medium">Monthly starting package for recent graduates.</p>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Sparkles size={20} className="text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Peak Salary</span>
                      </div>
                      <p className="text-5xl font-black text-white mb-2">₹{(college.tuition * 3.5 / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-slate-500 font-medium">Highest package offered by top global recruiters.</p>
                   </div>
                </div>
               </div>
            </section>

            {/* Student Reviews */}
            <section className="bg-white p-10 md:p-12 rounded-[3rem] shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-amber-50 p-3 rounded-2xl">
                  <Star className="text-amber-500" size={28} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Student Perspectives</h2>
              </div>
              
              <div className="space-y-8">
                {[
                  { name: "Arjun Mehta", year: "Final Year B.Tech", text: "The campus culture is vibrant and the industry connections here are unparalleled. Highly recommend the CSE program.", rating: 5 },
                  { name: "Priya Sharma", year: "Alumni 2024", text: "Infrastructure is top-notch, especially the new research wing. Faculty is supportive of startups.", rating: 4.5 }
                ].map((review, i) => (
                  <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-slate-900">{review.name}</h4>
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{review.year}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-slate-900">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-200 sticky top-28 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
               
               <div className="mb-10 text-center">
                 <div className="inline-flex bg-sky-50 p-4 rounded-2xl mb-4">
                    <Phone className="text-sky-600" size={24} />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-2">Admission Desk</h3>
                 <p className="text-slate-500 font-medium text-sm">Get personalized counseling from our senior education experts.</p>
               </div>
               
               <form className="space-y-4 mb-8">
                 <input type="text" placeholder="Your Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" />
                 <input type="tel" placeholder="Mobile Number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" />
                 <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all cursor-pointer">
                    <option>Select Preferred Course</option>
                    {college.courses.map((c: any) => <option key={c.id}>{c.title}</option>)}
                 </select>
               </form>
               
               <button className="w-full bg-slate-900 hover:bg-sky-600 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-2">
                 Request Free Counsel <ChevronRight size={18} />
               </button>
               
               <div className="mt-10 pt-10 border-t border-slate-50 grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2 group cursor-pointer">
                     <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                       <Globe size={18} className="text-slate-400 group-hover:text-sky-600" />
                     </div>
                     <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Website</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-pointer">
                     <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                       <Mail size={18} className="text-slate-400 group-hover:text-sky-600" />
                     </div>
                     <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Email</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-pointer">
                     <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                       <MessageSquare size={18} className="text-slate-400 group-hover:text-sky-600" />
                     </div>
                     <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Chat</span>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="pt-8 border-t border-white/5 text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">
             © 2026 CollegeFinder • Institutional Profile Verification System
           </div>
        </div>
      </footer>
    </div>
  );
}
